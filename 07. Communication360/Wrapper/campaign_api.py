import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'ConfigFile'))

from EmailWrapper import get_campaign_catalog, load_campaign_history, send_campaign_email


class CampaignHandler(BaseHTTPRequestHandler):
    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/campaigns":
            self._send_json(get_campaign_catalog())
        elif self.path.startswith("/history"):
            self._send_json({"history": load_campaign_history(limit=25)})
        else:
            self._send_json({"error": "Not found"}, 404)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path != "/send":
            self._send_json({"error": "Not found"}, 404)
            return

        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length).decode("utf-8")
        try:
            data = json.loads(body or "{}")
        except json.JSONDecodeError:
            self._send_json({"error": "Invalid JSON"}, 400)
            return

        template_name = data.get("template")
        subject = data.get("subject", "Campaign")
        campaign_type = data.get("campaign_type", "Custom Campaign")
        recipients = data.get("recipients")

        if not template_name:
            self._send_json({"error": "template is required"}, 400)
            return

        send_campaign_email(template_name, subject, campaign_type, recipients)
        self._send_json({"success": True, "message": "Campaign send process initiated"})

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8001), CampaignHandler)
    print("Campaign API running on http://127.0.0.1:8001")
    server.serve_forever()
