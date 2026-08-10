import re
import html as _html

try:
    import openai
except ImportError:
    openai = None

from config import OPENAI_API_KEY, AI_MODEL


def ai_extract_email(body_text):
    if not openai or not OPENAI_API_KEY:
        return None

    openai.api_key = OPENAI_API_KEY
    prompt = (
        "Extract the HR/contact email address from the following text. "
        "If there is a clear email address, return only that address. "
        "If no email address is present, return the exact text 'NOT_FOUND'.\n\n"
        f"Text:\n{body_text}\n"
    )

    try:
        response = openai.ChatCompletion.create(
            model=AI_MODEL,
            messages=[
                {"role": "system", "content": "You are a helpful assistant that extracts HR contact emails from email text."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=50,
            temperature=0.0,
        )
        answer = response.choices[0].message.content.strip()
        if answer and answer.upper() != "NOT_FOUND":
            return answer
    except Exception:
        return None
    return None


def extract_email_details(body, sender):


    # Default to the user's requested placeholder if not found
    data = {
        "company_name": "NUMM",
        "job_title": "NUMM",
        "job_description": "NUMM",
        "hr_name": "NUMM",
        "hr_email": "NUMM",
        "contact_number": "NUMM",
        "location": "NUMM",
    }



    # --------------------------
    # HR Email — handle mailto links and common obfuscations
    # --------------------------

    # email regex used throughout
    email_pattern = r'[\w\.\+\-]+@[\w\.-]+\.\w+'

    # First try to find any explicit mailto: links in the raw body
    mailtos = re.findall(r'mailto:([\w\.\+\-]+@[\w\.-]+\.\w+)', body or "", flags=re.IGNORECASE)
    if mailtos:
        data["hr_email"] = mailtos[0].strip()
    else:
        # Normalize text: unescape HTML entities, strip tags, and deobfuscate common replacements
        t = _html.unescape(body or "")
        # remove html tags if any remain
        t = re.sub(r'<[^>]+>', ' ', t)
        # Replace common obfuscations like (at), [at], dot, etc.
        t = re.sub(r'(?i)\b(?:\[?at\]?|\(?at\)?|&#x40;|&#64;)\b', '@', t)
        t = re.sub(r'(?i)\b(?:\[?dot\]?|\(?dot\)?|&#x2e;|&#46;)\b', '.', t)
        # Remove spaces around @ and dots that may have been inserted
        t = re.sub(r'\s*@\s*', '@', t)
        t = re.sub(r'\s*\.\s*', '.', t)
        # Remove zero-width and other invisible characters
        t = t.replace('\u200b', '').replace('\ufeff', '')

        email_pattern = r'[\w\.\+\-]+@[\w\.-]+\.\w+'
        emails = re.findall(email_pattern, t)
        if emails:
            data["hr_email"] = emails[0].strip()
        else:
            # fallback to sender header
            s = re.search(email_pattern, sender or "")
            if s:
                data["hr_email"] = s.group(0).strip()

    # If still not found, try looser extraction: tokens or sentences that include '@' or obfuscated 'at'
    if data["hr_email"] == "NUMM":
        search_text = _html.unescape(body or "")
        # Remove tags to simplify token search
        plain = re.sub(r'<[^>]+>', ' ', search_text)

        # Look for explicit tokens with '@' even if they don't match full email regex
        loose_at_tokens = re.findall(r'[^\s@]{1,64}@[^\\s@]{1,64}', plain)

        candidates = loose_at_tokens[:]

        # Also look for obfuscated patterns like 'name [at] domain dot com'
        obf = re.findall(r"\S+\s*(?:\[at\]|\(at\)|\sat\s)\s*\S+", plain, flags=re.IGNORECASE)
        candidates.extend(obf)

        found = False
        for cand in candidates:
            cleaned = cand
            cleaned = re.sub(r'(?i)\b(?:\[?at\]?|\(?at\)?|&#x40;|&#64;)\b', '@', cleaned)
            cleaned = re.sub(r'(?i)\b(?:\[?dot\]?|\(?dot\)?|&#x2e;|&#46;)\b', '.', cleaned)
            # strip surrounding punctuation
            cleaned = cleaned.strip(" \t\n\r\'\"<>()[]:,;")
            # normalize spaces
            cleaned = re.sub(r'\s+', '', cleaned)
            if re.match(email_pattern, cleaned):
                data["hr_email"] = cleaned
                found = True
                break

        if not found:
            # As a last resort, capture the full sentence containing '@' or ' at ' as context
            # split into sentences by common delimiters
            sentences = re.split(r'(?<=[\.\?\!\n])\s+', body or "")
            for sent in sentences:
                if '@' in sent or re.search(r'\b(at)\b', sent, flags=re.IGNORECASE):
                    snippet = sent.strip()[:300]
                    if snippet:
                        data["hr_email"] = snippet
                        break



    # --------------------------
    # Contact Number
    # --------------------------

    # Phone patterns: common Indian pattern and a more generic international-ish pattern
    phone_patterns = [
        r'(\+91[\-\s]?)?[6-9]\d{9}',
        r'(?:\+\d{1,3}[\-\s]?)?(?:\(?\d{1,4}\)?[\-\s]?)?[\d\-\s]{6,14}\d'
    ]

    for phone_pattern in phone_patterns:
        phone = re.findall(phone_pattern, body)
        if phone:
            # re.findall may return tuples for groups; normalize to string
            if isinstance(phone[0], tuple):
                # join non-empty groups
                num = "".join([p for p in phone[0] if p])
            else:
                num = phone[0]
            data["contact_number"] = num.strip()
            break



    # --------------------------
    # Job Title
    # --------------------------

    job_keywords = [

        "Data Engineer",

        "Senior Data Engineer",

        "Python Developer",

        "SQL Developer",

        "Software Engineer",

        "Backend Developer",

        "Data Analyst"

    ]


    for job in job_keywords:

        if job.lower() in body.lower():

            data["job_title"] = job

            break



    # --------------------------
    # Company Extraction
    # --------------------------

    company_patterns = [

        r'Company\s*:\s*(.*)',

        r'Organization\s*:\s*(.*)',

        r' at ([A-Za-z ]+)'

    ]


    # Try a set of patterns and also look at signature lines
    for pattern in company_patterns:
        match = re.search(pattern, body, re.IGNORECASE)
        if match:
            candidate = match.group(1).strip()
            # Clean trailing punctuation
            candidate = candidate.rstrip(' .,-\n')
            data["company_name"] = candidate
            break

    # Additional heuristic: look for lines in signature that look like company names
    if data["company_name"] == "NUMM":
        lines = [l.strip() for l in body.splitlines() if l.strip()]
        # check last 6 lines for a capitalized short phrase
        tail = lines[-6:]
        for line in tail:
            # skip lines that look like names or common closing words
            if len(line) > 2 and any(c.isalpha() for c in line) and not line.lower().startswith(('regards', 'thanks', 'thank', 'best')):
                # if line has more than one word and it's title-cased, consider it
                words = line.split()
                if len(words) <= 5 and sum(1 for w in words if w[0].isupper()) >= 1:
                    data["company_name"] = line.rstrip(' .,-')
                    break



    # --------------------------
    # HR Name
    # --------------------------

    hr_patterns = [

        r'HR\s*:\s*(.*)',

        r'Recruiter\s*:\s*(.*)',

        r'Thanks,\s*(.*)'

    ]


    for pattern in hr_patterns:
        match = re.search(pattern, body, re.IGNORECASE)
        if match:
            data["hr_name"] = match.group(1).strip().rstrip(' .,-')
            break



    # --------------------------
    # Location
    # --------------------------

    locations=[

        "Pune",

        "Mumbai",

        "Bangalore",

        "Hyderabad",

        "Chennai",

        "Noida"

    ]


    for loc in locations:
        if loc.lower() in body.lower():
            data["location"] = loc
            break



    # Job Description

    # Job Description (truncate to reasonable size)
    data["job_description"] = (body or "")[:1000] if body else "NUMM"

    return data