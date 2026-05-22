import sqlite3
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr
from fastapi import FastAPI, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from dotenv import load_dotenv

# Load credentials from .env file relative to the main.py location
base_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(base_dir, '.env')
load_dotenv(dotenv_path)

app = FastAPI(title="Lucky Sharma Portfolio API")

# Configure CORS to accept connection from frontend port 5173 and custom origins
allowed_origins_env = os.environ.get("ALLOWED_ORIGINS")
if allowed_origins_env:
    origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]
else:
    origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_FILE = "database.db"

def init_db():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

# Initialize DB on startup
init_db()

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: Optional[str] = ""
    message: str

class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: str

def send_email_notification(name: str, sender_email: str, subject: str, message: str):
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = os.environ.get("SMTP_PORT")
    smtp_username = os.environ.get("SMTP_USERNAME")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    recipient_email = os.environ.get("RECIPIENT_EMAIL", "luckysharma7578@gmail.com")

    # If SMTP configuration is not provided in environment, simulate it in terminal
    if not all([smtp_host, smtp_port, smtp_username, smtp_password]):
        print("\n=== ✉️ [Email Notification (Simulated)] ===")
        print(f"Recipient: {recipient_email}")
        print(f"From Name: {name}")
        print(f"From Mail: {sender_email}")
        print(f"Subject  : New Portfolio Message - {subject or 'No Subject'}")
        print(f"Message  :\n{message}")
        print("===========================================")
        print("Tip: Define SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD environment variables to send real emails.\n")
        return

    try:
        # Create message container
        msg = MIMEMultipart()
        msg['From'] = formataddr((name, smtp_username))
        msg['Reply-To'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"New Portfolio Message from {name}: {subject or 'No Subject'}"

        body = f"""
You have received a new contact form submission from your portfolio website.

Sender Details:
- Name: {name}
- Email: {sender_email}
- Subject: {subject or 'No Subject'}

Message:
{message}
"""
        msg.attach(MIMEText(body, 'plain'))

        # Standard SMTP connection with STARTTLS
        port = int(smtp_port)
        server = smtplib.SMTP(smtp_host, port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        server.sendmail(smtp_username, recipient_email, msg.as_string())
        server.quit()
        print(f"SUCCESS: Email notification successfully sent to {recipient_email}!")
    except Exception as e:
        print(f"ERROR: Failed to send email notification: {str(e)}")

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
def contact_submit(msg: ContactMessage, background_tasks: BackgroundTasks):
    if not msg.name.strip() or not msg.email.strip() or not msg.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Name, email, and message are required fields."
        )
    
    try:
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
            (msg.name.strip(), msg.email.strip(), msg.subject.strip() if msg.subject else "", msg.message.strip())
        )
        conn.commit()
        conn.close()
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save message: {str(e)}"
        )
    
    # Send email in background asynchronously to prevent blocking the API response
    background_tasks.add_task(
        send_email_notification,
        msg.name.strip(),
        msg.email.strip(),
        msg.subject.strip() if msg.subject else "",
        msg.message.strip()
    )
    
    return {"status": "success", "message": "Your message was saved and notification dispatched!"}

@app.get("/api/messages", response_model=List[MessageResponse])
def get_messages():
    try:
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, subject, message, created_at FROM messages ORDER BY created_at DESC")
        rows = cursor.fetchall()
        conn.close()
        
        messages = []
        for row in rows:
            messages.append(
                MessageResponse(
                    id=row[0],
                    name=row[1],
                    email=row[2],
                    subject=row[3],
                    message=row[4],
                    created_at=row[5]
                )
            )
        return messages
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch messages: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    # In production, we run with reload=False and host=0.0.0.0
    is_prod = os.environ.get("PORT") is not None
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=not is_prod)
