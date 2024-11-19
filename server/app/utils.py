from dotenv import load_dotenv
import imaplib
import email
import os
import re
from bs4 import BeautifulSoup
from email.header import decode_header
import requests
from fastapi import FastAPI, HTTPException


load_dotenv()

username = os.getenv("EMAIL")
password = os.getenv("PASSWORD")


def connect_to_mail():
    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com")
        mail.login(username, password)
        mail.select("inbox")
        return mail
    except imaplib.IMAP4.error as e:
        raise HTTPException(status_code=401, detail="Authentication failed")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error connecting to mail server: {str(e)}")


def extract_date(date_string):
    return " ".join(date_string.split(" ")[:4])


def filter_email_ids(email_ids, param):
    # Calculate the starting and ending indices for the slice
    start_index = len(email_ids) - (param * 10)
    end_index = len(email_ids) - ((param - 1) * 10)

    # Ensure indices are within valid bounds
    if start_index < 0:
        start_index = 0

    # Slice the array and return the result
    return email_ids[start_index:end_index]


def search_for_email(param):
    try:
        mail = connect_to_mail()
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to connect to mail server: {str(e)}")

    try:
        _, search_data = mail.search(None, '(BODY "unsubscribe")')
        email_ids = search_data[0].split()

        if not email_ids:
            return []

        links_with_detail = []
        # last_20_elements = email_ids[-10:]

        for email_id in filter_email_ids(email_ids, param):
            try:
                _, data = mail.fetch(email_id, "(RFC822)")
                msg = email.message_from_bytes(data[0][1])

                try:
                    _name, _email = msg.get("From").split('<')
                    _name = _name.strip()
                    _email = _email.rstrip('>')
                except Exception:
                    _name, _email = "Unknown", "Unknown"

                list_Unsubscribe = msg.get("List-Unsubscribe")
                https_link = ""
                if (isinstance(list_Unsubscribe, str)):
                    https_link = re.findall(
                        r'https://[^\s<>"]+', list_Unsubscribe)
                    https_link = https_link[0] if https_link else ''
                else:
                    decoded_str = "No Subject"

                encoded_str = msg.get("Subject")
                decoded_bytes, charset = decode_header(encoded_str)[0]
                decoded_str = decoded_bytes.decode(
                    charset) if charset else decoded_bytes

                an_email = {
                    "date": extract_date(msg.get("Date")),
                    "from": _name,
                    "email": _email,
                    "subject": decoded_str,
                    "unsubscribeLink": https_link
                }

                links_with_detail.append(an_email)

            except Exception as e:
                links_with_detail.append(
                    {"Error": f"Failed to process email {email_id}: {str(e)}"})

        mail.logout()
        return links_with_detail

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error searching emails: {str(e)}")
