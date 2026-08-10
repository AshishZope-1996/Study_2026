import json
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'ConfigFile'))

from configdb import get_db_connection # type: ignore


class DashboardStatsHandler(BaseHTTPRequestHandler):
    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path != '/dashboard-stats':
            self._send_json({'error': 'Not found'}, 404)
            return

        try:
            with get_db_connection() as conn:
                with conn.cursor() as cur:
                    cur.execute('SELECT * FROM public.get_dashboard_stats()')
                    row = cur.fetchone()

            if not row:
                self._send_json({
                    'campaignCount': 0,
                    'sentCount': 0,
                    'recipientCount': 0,
                    'historyCount': 0
                })
                return

            self._send_json({
                'campaignCount': int(row[0] or 0),
                'sentCount': int(row[1] or 0),
                'recipientCount': int(row[2] or 0),
                'historyCount': int(row[3] or 0)
            })
        except Exception as exc:
            self._send_json({
                'campaignCount': 0,
                'sentCount': 0,
                'recipientCount': 0,
                'historyCount': 0,
                'error': str(exc)
            }, 500)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        return


if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', 8002), DashboardStatsHandler)
    print('Dashboard stats API running on http://127.0.0.1:8002/dashboard-stats')
    server.serve_forever()
