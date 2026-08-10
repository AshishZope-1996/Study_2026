import os
import re
import sys
import smtplib
from datetime import datetime
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'ConfigFile'))

from Config import SENDER_EMAIL, SENDER_PASSWORD # type: ignore
from configdb import get_db_connection # type: ignore

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

PROJECT_ROOT = Path(__file__).resolve().parent.parent
TEMPLATE_DIR = PROJECT_ROOT / "Templates"
PDF_DIR = TEMPLATE_DIR / "PDF"


def _humanize_name(value):
    cleaned = re.sub(r"[_\-\.]+", " ", str(value)).strip()
    if not cleaned:
        return "Campaign"
    return " ".join(part.capitalize() for part in cleaned.split())


def _infer_campaign_key(template_name):
    stem = Path(template_name).stem.lower()
    if "linkedin" in stem:
        return "LinkedIn"
    if "festival" in stem:
        return "Festival"
    if "instagram" in stem or "social" in stem:
        return "Social"
    if "email" in stem:
        return "Email"
    return "General"


def _get_default_subject(template_name, campaign_key):
    template_label = _humanize_name(Path(template_name).stem)
    if campaign_key == "LinkedIn":
        return "Sharing My Notes With You"
    if campaign_key == "Festival":
        return f"{template_label} Campaign"
    return f"{template_label} Update"


def _extract_subject_from_html(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as handle:
            content = handle.read()

        patterns = [
            r"<title>(.*?)</title>",
            r"<h1[^>]*>(.*?)</h1>",
            r"subject\s*[:=]\s*['\"]?(.*?)['\"]?",
            r"Subject\s*[:=]\s*['\"]?(.*?)['\"]?"
        ]

        for pattern in patterns:
            match = re.search(pattern, content, flags=re.IGNORECASE | re.DOTALL)
            if match and match.group(1).strip():
                cleaned = re.sub(r"<.*?>", " ", match.group(1))
                return re.sub(r"\s+", " ", cleaned).strip()

        return None
    except Exception:
        return None


def _match_template_pdfs(template_name, pdf_dir=None):
    all_pdfs = get_pdf_attachments(pdf_dir)
    if not all_pdfs:
        return []

    stem = Path(template_name).stem.lower()
    matched = []
    for pdf_path in all_pdfs:
        pdf_stem = Path(pdf_path).stem.lower()
        if stem in pdf_stem or pdf_stem in stem:
            matched.append(pdf_path)
    return matched if matched else all_pdfs


def discover_templates_from_folder(template_dir=None):
    base_dir = Path(template_dir) if template_dir else TEMPLATE_DIR
    if not base_dir.exists():
        return {"campaigns": [], "templates": []}

    campaigns = []
    seen_campaigns = set()
    templates = []

    html_files = sorted(
        [item for item in base_dir.iterdir() if item.is_file() and item.suffix.lower() in {".html", ".htm"}],
        key=lambda item: item.name.lower()
    )

    for template_path in html_files:
        template_name = template_path.name
        campaign_key = _infer_campaign_key(template_name)
        if campaign_key not in seen_campaigns:
            campaigns.append({
                "key": campaign_key,
                "label": f"{_humanize_name(campaign_key)} Campaign"
            })
            seen_campaigns.add(campaign_key)

        matched_pdfs = _match_template_pdfs(template_name, str(PDF_DIR))
        subject = _extract_subject_from_html(template_path) or _get_default_subject(template_name, campaign_key)
        pdf_path = matched_pdfs[0] if matched_pdfs else ""

        templates.append({
            "campaign": campaign_key,
            "template": template_name,
            "label": _humanize_name(Path(template_name).stem),
            "subject": subject,
            "pdf_path": pdf_path,
            "pdf_files": matched_pdfs
        })

    return {"campaigns": campaigns, "templates": templates}


def get_template_catalog_from_db():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    '''
                    SELECT "TemplateFile", "CampaignType", "DisplayName", "Subject", "PdfPath"
                    FROM master."TemplateCatalog"
                    WHERE "IsActive" = true
                    ORDER BY "CampaignType", "DisplayName"
                    '''
                )
                rows = cur.fetchall()

        if not rows:
            return None

        campaigns = []
        campaign_seen = set()
        templates = []

        for template_file, campaign_type, display_name, subject, pdf_path in rows:
            if campaign_type not in campaign_seen:
                campaigns.append({
                    "key": campaign_type,
                    "label": f"{_humanize_name(campaign_type)} Campaign"
                })
                campaign_seen.add(campaign_type)

            templates.append({
                "campaign": campaign_type,
                "template": template_file,
                "label": display_name or _humanize_name(template_file),
                "subject": subject or _get_default_subject(template_file, campaign_type),
                "pdf_path": pdf_path or "",
                "pdf_files": [pdf_path] if pdf_path else []
            })

        return {"campaigns": campaigns, "templates": templates}
    except Exception:
        return None


def load_receivers_from_db():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    'SELECT "FirstName", "LastName", "EmailAddress", "Date" '
                    'FROM master."UserDetails" WHERE isactive = true ORDER BY "UserId"'
                )
                rows = cur.fetchall()

        receivers = []
        for first_name, last_name, email_address, date_value in rows:
            if not email_address:
                continue
            receivers.append({
                "email": email_address,
                "name": first_name or last_name or "User",
                "date": str(date_value) if date_value is not None else ""
            })
        return receivers
    except Exception as exc:
        print(f"Database error while loading users: {exc}")
        return []


def log_to_db(RECEIVER, STATUS, CAMPAIGN_TYPE, ERROR=""):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    'INSERT INTO log."EmailAuditLog" ("TimeStamp", "SentFrom", "SentTo", "CampaignType", "Status", "ErrorMessage") '
                    'VALUES (%s, %s, %s, %s, %s, %s)',
                    (
                        datetime.now(),
                        SENDER_EMAIL,
                        RECEIVER,
                        CAMPAIGN_TYPE,
                        STATUS,
                        ERROR
                    )
                )
                conn.commit()
    except Exception as exc:
        print(f"Database error while logging audit entry: {exc}")


def sync_template_catalog_to_db(template_dir=None, force=False):
    base_dir = Path(template_dir) if template_dir else TEMPLATE_DIR
    catalog = discover_templates_from_folder(base_dir)
    if not catalog["templates"]:
        return 0

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    '''
                    CREATE TABLE IF NOT EXISTS master."TemplateCatalog" (
                        "TemplateId" SERIAL PRIMARY KEY,
                        "TemplateFile" VARCHAR(255) NOT NULL,
                        "CampaignType" VARCHAR(100) NOT NULL,
                        "DisplayName" VARCHAR(255) NOT NULL,
                        "Subject" TEXT,
                        "PdfPath" TEXT,
                        "IsActive" BOOLEAN DEFAULT TRUE,
                        "CreatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                    '''
                )
                cur.execute(
                    'CREATE UNIQUE INDEX IF NOT EXISTS ux_template_catalog_template_file ON master."TemplateCatalog" ("TemplateFile")'
                )

                if force:
                    cur.execute('DELETE FROM master."TemplateCatalog"')

                for template in catalog["templates"]:
                    pdf_path = (template.get("pdf_path") or "").strip()
                    cur.execute(
                        '''
                        INSERT INTO master."TemplateCatalog" (
                            "TemplateFile", "CampaignType", "DisplayName", "Subject", "PdfPath", "IsActive"
                        )
                        VALUES (%s, %s, %s, %s, %s, %s)
                        ON CONFLICT ("TemplateFile") DO UPDATE SET
                            "CampaignType" = EXCLUDED."CampaignType",
                            "DisplayName" = EXCLUDED."DisplayName",
                            "Subject" = EXCLUDED."Subject",
                            "PdfPath" = EXCLUDED."PdfPath",
                            "IsActive" = EXCLUDED."IsActive"
                        ''',
                        (
                            template["template"],
                            template["campaign"],
                            template["label"],
                            template.get("subject") or "",
                            pdf_path,
                            True
                        )
                    )
                conn.commit()
                return len(catalog["templates"])
    except Exception as exc:
        print(f"Database sync error: {exc}")
        return 0


def get_campaign_catalog():
    db_catalog = get_template_catalog_from_db()
    if db_catalog and db_catalog["templates"]:
        return db_catalog

    catalog = discover_templates_from_folder(TEMPLATE_DIR)
    if catalog["templates"]:
        return catalog

    return {"campaigns": [], "templates": []}


def load_campaign_history(limit=20):
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    'SELECT "TimeStamp", "SentTo", "CampaignType", "Status", "ErrorMessage" '
                    'FROM log."EmailAuditLog" ORDER BY "TimeStamp" DESC LIMIT %s',
                    (limit,)
                )
                rows = cur.fetchall()

        history = []
        for timestamp, sent_to, campaign_type, status, error_message in rows:
            history.append({
                "timestamp": str(timestamp),
                "sent_to": sent_to,
                "campaign_type": campaign_type,
                "status": status,
                "error_message": error_message or ""
            })
        return history
    except Exception as exc:
        print(f"Database error while loading campaign history: {exc}")
        return []


def get_pdf_attachments(pdf_dir=None):
    if pdf_dir is None:
        pdf_dir = os.path.join(os.path.dirname(__file__), "..", "Templates", "PDF")

    if not os.path.isdir(pdf_dir):
        return []

    pdf_files = []
    for file_name in sorted(os.listdir(pdf_dir)):
        full_path = os.path.join(pdf_dir, file_name)
        if os.path.isfile(full_path) and file_name.lower().endswith(".pdf"):
            pdf_files.append(full_path)
    return pdf_files


def get_template_pdf_files(template_name):
    template_catalog = get_campaign_catalog()
    matching_entry = next(
        (item for item in template_catalog.get("templates", []) if item.get("template") == template_name),
        None
    )

    if matching_entry and matching_entry.get("pdf_files"):
        return matching_entry["pdf_files"]

    if matching_entry and matching_entry.get("pdf_path"):
        return [matching_entry["pdf_path"]]

    pdf_folder = os.path.join(os.path.dirname(__file__), "..", "Templates", "PDF")
    pdf_files = get_pdf_attachments(pdf_folder)
    return pdf_files


def send_campaign_email(TEMPLATE_NAME, EMAIL_SUBJECT, CAMPAIGN_TYPE, RECIPIENTS=None):
    TOTAL_SENT = 0
    TOTAL_FAILED = 0

    if RECIPIENTS is None:
        RECIPIENTS = load_receivers_from_db()

    if not RECIPIENTS:
        print("No recipients found in the database.")
        return

    try:
        DATA_FOLDER = os.path.join(os.path.dirname(__file__), "..", "Templates")
        HTML_PATH = os.path.join(DATA_FOLDER, TEMPLATE_NAME)
        PDF_FILES = get_template_pdf_files(TEMPLATE_NAME)

        if not os.path.exists(HTML_PATH):
            print(f"Template '{TEMPLATE_NAME}' not found.")
            return

        with open(HTML_PATH, "r", encoding="utf-8") as F:
            HTML_TEMPLATE = F.read()

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as SERVER:
            SERVER.starttls()
            SERVER.login(SENDER_EMAIL, SENDER_PASSWORD)

            for RECEIVER in RECIPIENTS:
                try:
                    RECEIVER_EMAIL = RECEIVER["email"]
                    RECEIVER_NAME = RECEIVER["name"]
                    HTML_CONTENT = HTML_TEMPLATE.replace("{{NAME}}", RECEIVER_NAME)

                    MSG = MIMEMultipart("mixed")
                    MSG["From"] = SENDER_EMAIL
                    MSG["To"] = RECEIVER_EMAIL
                    MSG["Subject"] = EMAIL_SUBJECT

                    BODY_PART = MIMEText(HTML_CONTENT, "html")
                    MSG.attach(BODY_PART)

                    for pdf_path in PDF_FILES:
                        if not os.path.exists(pdf_path):
                            continue
                        with open(pdf_path, "rb") as pdf_file:
                            pdf_data = pdf_file.read()

                        pdf_attachment = MIMEApplication(pdf_data, _subtype="pdf")
                        pdf_attachment.add_header(
                            "Content-Disposition",
                            "attachment",
                            filename=os.path.basename(pdf_path)
                        )
                        MSG.attach(pdf_attachment)

                    SERVER.send_message(MSG)
                    print(f"✓ Email sent to: {RECEIVER_EMAIL}")
                    TOTAL_SENT += 1
                    log_to_db(RECEIVER_EMAIL, "SUCCESS", CAMPAIGN_TYPE)

                except Exception as E:
                    print(f"✗ Failed to send to {RECEIVER_EMAIL}: {E}")
                    TOTAL_FAILED += 1
                    log_to_db(RECEIVER_EMAIL, "FAILED", CAMPAIGN_TYPE, str(E))

    except smtplib.SMTPAuthenticationError:
        print("Authentication failed. Check your Gmail app password.")
    except Exception as E:
        print(f"Unexpected error: {E}")
    finally:
        print(f"\n{'='*50}")
        print(f"Total Sent: {TOTAL_SENT} | Total Failed: {TOTAL_FAILED}")
        print(f"{'='*50}")


def display_menu():
    catalog = get_campaign_catalog()
    campaigns = catalog.get("campaigns", [])

    print("\n" + "="*60)
    print("GENERIC EMAIL CAMPAIGN MENU")
    print("="*60)

    if not campaigns:
        print("No templates found in the Templates folder.")
        return None, []

    for index, campaign in enumerate(campaigns, start=1):
        print(f"{index}. {campaign['label']}")
    print(f"{len(campaigns) + 1}. Exit")

    choice = input(f"Select option (1-{len(campaigns) + 1}): ").strip()
    return choice, campaigns


def select_template_for_campaign(campaign_key):
    catalog = get_campaign_catalog()
    templates = [item for item in catalog.get("templates", []) if item.get("campaign") == campaign_key]

    if not templates:
        print(f"No templates found for campaign: {campaign_key}")
        return None

    print("\n" + "="*60)
    print(f"{_humanize_name(campaign_key)} TEMPLATES")
    print("="*60)

    for index, template in enumerate(templates, start=1):
        print(f"{index}. {template['label']}")
    print(f"{len(templates) + 1}. Back")

    choice = input(f"Select option (1-{len(templates) + 1}): ").strip()
    if not choice.isdigit():
        return None

    choice_index = int(choice)
    if 1 <= choice_index <= len(templates):
        selected = templates[choice_index - 1]
        return selected
    return None


def main():
    while True:
        choice, campaigns = display_menu()
        if not campaigns:
            break

        if choice.isdigit() and 1 <= int(choice) <= len(campaigns):
            selected_campaign = campaigns[int(choice) - 1]
            template_entry = select_template_for_campaign(selected_campaign["key"])

            if template_entry is None:
                continue

            send_campaign_email(
                template_entry["template"],
                template_entry.get("subject") or _get_default_subject(template_entry["template"], selected_campaign["key"]),
                selected_campaign["key"]
            )
        elif choice == str(len(campaigns) + 1):
            print("Exiting... Goodbye!")
            break
        else:
            print("Invalid option. Please try again.")


if __name__ == "__main__":
    main()
