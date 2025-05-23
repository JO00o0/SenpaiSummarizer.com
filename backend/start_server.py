import os
import requests
import qrcode
import time
from pyngrok import ngrok

# بياناتك
TELEGRAM_TOKEN = "حط_توكن_البوت_هنا"
TELEGRAM_CHAT_ID = "حط_الـID_هنا"
FLASK_PORT = 5000

# شغل السيرفر
os.system("python app.py &")
time.sleep(3)

# شغل ngrok
public_url = ngrok.connect(FLASK_PORT).public_url

# ابعت اللينك
msg = f"لينك الموقع:\n{public_url}"
requests.get(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage",
             params={"chat_id": TELEGRAM_CHAT_ID, "text": msg})

# اعمل QR
img = qrcode.make(public_url)
img.save("qr.png")

# ابعت QR
files = {'photo': open("qr.png", 'rb')}
requests.post(f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendPhoto",
              data={"chat_id": TELEGRAM_CHAT_ID}, files=files)

print("اللينك والـ QR وصلوك على Telegram")
