from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from urllib.parse import quote

# Enter recipient's phone number with country code (no +)
phone = "7744046830"

# Message
message = "Hello! This is a test message sent from Python."

# Open Chrome
driver = webdriver.Chrome()

# Open WhatsApp chat
url = f"https://web.whatsapp.com/send?phone={phone}&text={quote(message)}"
print(url)
driver.get(url)

print("Please scan the QR code if this is your first time.")
time.sleep(20)  # Wait for WhatsApp Web to load

# Click the Send button
send_button = driver.find_element(By.XPATH, '//button[@aria-label="Send"]')
send_button.click()

print("✅ Message sent successfully!")

time.sleep(5)
driver.quit()