import imaplib
import email
from email.header import decode_header
from bs4 import BeautifulSoup

from database import SessionLocal
from models import Email
from config import *
from email_parser import extract_email_details

print("=" * 70)
print("📧 EMAIL EXTRACTION STARTED")
print("=" * 70)

print(f"Connecting to IMAP Server : {IMAP_SERVER}")

mail = imaplib.IMAP4_SSL(IMAP_SERVER)

print("Logging into Email...")

mail.login(EMAIL, PASSWORD)

print("✅ Login Successful")

print("Selecting Inbox...")

mail.select("INBOX")

print("Searching for unread emails...")

status, messages = mail.search(None, "UNSEEN")

email_ids = messages[0].split()

print(f"📨 Total Unread Emails Found : {len(email_ids)}")

db = SessionLocal()

email_count = 0

for email_id in email_ids:

    email_count += 1

    print("\n" + "=" * 70)
    print(f"Processing Email {email_count}/{len(email_ids)}")
    print("=" * 70)

    status, msg_data = mail.fetch(email_id, "(RFC822)")

    for response in msg_data:

        if not isinstance(response, tuple):
            continue

        msg = email.message_from_bytes(response[1])

        message_id = msg.get("Message-ID")

        print("Message ID :", message_id)

        # Check Duplicate
        existing = db.query(Email).filter_by(message_id=message_id).first()

        if existing:
            print("⚠ Email Already Exists in Database.")
            continue

        # Subject
        subject, encoding = decode_header(msg.get("Subject"))[0]

        if isinstance(subject, bytes):
            subject = subject.decode(encoding or "utf-8", errors="ignore")

        sender = msg.get("From")

        receiver = msg.get("To")

        date = msg.get("Date")

        print("From    :", sender)
        print("To      :", receiver)
        print("Subject :", subject)
        print("Date    :", date)

        body = ""
        html_text = ""
        mailto_links = []

        if msg.is_multipart():
            print("Multipart Email Detected")
            for part in msg.walk():
                content_type = part.get_content_type()
                disp = str(part.get('Content-Disposition'))
                # prefer plain text, but also capture HTML and mailto links
                if content_type == "text/plain" and not body:
                    try:
                        body = part.get_payload(decode=True).decode(errors="ignore")
                    except Exception:
                        body = (part.get_payload(decode=True) or b"").decode(errors="ignore")
                elif content_type == "text/html":
                    raw_html = part.get_payload(decode=True)
                    if raw_html:
                        try:
                            html_decoded = raw_html.decode(errors="ignore")
                        except Exception:
                            html_decoded = str(raw_html)
                        soup = BeautifulSoup(html_decoded, 'html.parser')
                        html_text = soup.get_text(' ')
                        # collect mailto hrefs
                        for a in soup.find_all('a', href=True):
                            href = a['href']
                            if href.lower().startswith('mailto:'):
                                mailto_links.append(href.split(':', 1)[1])
        else:
            payload = msg.get_payload(decode=True)
            if payload:
                try:
                    body = payload.decode(errors="ignore")
                except Exception:
                    body = str(payload)

        # Compose a combined text to feed to the parser: plain text + html text + mailto links
        combined_body = ' '.join(filter(None, [body, html_text, ' '.join(mailto_links)]))

        print(f"Body Length : {len(combined_body)} Characters")

        # Extract HR / contact / company details from combined body (plain + html + mailto)
        details = extract_email_details(combined_body or "", sender)

        print("Parsed HR Email:", details.get("hr_email"))
        print("Parsed Contact:", details.get("contact_number"))
        print("Parsed Company:", details.get("company_name"))

        obj = Email(
            message_id=message_id,
            sender=sender,
            subject=subject,
            body=body,
            received_date=email.utils.parsedate_to_datetime(date),
            hr_email=details.get("hr_email"),
            contact_number=details.get("contact_number"),
            company_name=details.get("company_name")
        )

        print("Saving Email to Database...")

        db.add(obj)

        db.commit()

        print("✅ Saved Successfully")

print("\n" + "=" * 70)
print("Email Extraction Completed")
print(f"Processed Emails : {email_count}")
print("=" * 70)

db.close()

mail.logout()

print("Database Connection Closed")
print("Logged Out Successfully")