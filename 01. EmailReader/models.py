from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime

Base = declarative_base()

class Email(Base):

    __tablename__ = "emails"

    id = Column(Integer, primary_key=True)

    message_id = Column(String, unique=True)

    sender = Column(String)

    subject = Column(String)

    body = Column(Text)

    received_date = Column(DateTime)

    # Parsed contact details
    hr_email = Column(String)

    contact_number = Column(String)

    company_name = Column(String)