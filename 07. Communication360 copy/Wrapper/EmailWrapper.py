import os
import sys
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'ConfigFile'))

from Config import SENDER_EMAIL, SENDER_PASSWORD
from configdb import get_db_connection

# 
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

CAMPAIGN_CONFIG = {
    "LinkedIn": {
        "template": "Email_Instagram.html",
        "subject": "Instagram Follow  ->> @decode.dataengineer",
        "type": "LinkedIn Campaign"
    },
    "Festival": {
        "Diwali": {
            "template": "Festival_Diwali.html",
            "subject": "Happy Diwali....!!",
            "type": "Diwali Festival Campaign"
        },
        "Holi": {
            "template": "Holi.html",
            "subject": "Happy Holi!",
            "type": "Holi Festival Campaign"
        },
        "Christmas": {
            "template": "Christmas.html",
            "subject": "Merry Christmas!",
            "type": "Christmas Festival Campaign"
        }
    }
}


def load_receivers_from_db():
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    'SELECT "FirstName", "LastName", "EmailAddress", "Date" '
                    'FROM master."UserDetails" ORDER BY "UserId"'
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

                    MSG = MIMEMultipart("related")
                    MSG["From"] = SENDER_EMAIL
                    MSG["To"] = RECEIVER_EMAIL
                    MSG["Subject"] = EMAIL_SUBJECT

                    MSG_ALT = MIMEMultipart("alternative")
                    MSG.attach(MSG_ALT)
                    MSG_ALT.attach(MIMEText(HTML_CONTENT, "html"))

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
    print("\n" + "="*50)
    print("EMAIL CAMPAIGN MENU")
    print("="*50)
    print("1. LinkedIn Campaign")
    print("2. Festival Campaign")
    print("3. Exit")
    return input("Select option (1-3): ").strip()


def festival_submenu():
    print("\n" + "="*50)
    print("FESTIVAL CAMPAIGNS")
    print("="*50)
    festivals = list(CAMPAIGN_CONFIG["Festival"].keys())
    for i, festival in enumerate(festivals, 1):
        print(f"{i}. {festival}")
    print(f"{len(festivals) + 1}. Back to Main Menu")

    choice = input(f"Select option (1-{len(festivals) + 1}): ").strip()

    if choice.isdigit() and 1 <= int(choice) <= len(festivals):
        return festivals[int(choice) - 1]
    return None


def main():
    while True:
        choice = display_menu()

        if choice == "1":
            config = CAMPAIGN_CONFIG["LinkedIn"]
            send_campaign_email(config["template"], config["subject"], config["type"])

        elif choice == "2":
            festival = festival_submenu()
            if festival:
                config = CAMPAIGN_CONFIG["Festival"][festival]
                send_campaign_email(config["template"], config["subject"], config["type"])

        elif choice == "3":
            print("Exiting... Goodbye!")
            break

        else:
            print("Invalid option. Please try again.")


if __name__ == "__main__":
    main()
