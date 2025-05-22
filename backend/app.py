from flask import Flask, request, jsonify, send_from_directory
from summarizer import summarize_text
from ocr_utils import extract_text_from_image
import os

# تهيئة تطبيق Flask مع تحديد مجلد frontend كمجلد للملفات الثابتة
app = Flask(__name__, 
           static_folder='../frontend',
           static_url_path='')

# تأكد إن مجلد رفع الصور موجود
UPLOAD_FOLDER = '../static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# الصفحة الرئيسية - عرض index.html
@app.route('/')
def index():
    return app.send_static_file('index.html')

# فحص صحة الخادم
@app.route('/health', methods=['GET'])
def health_check():
    print("Health check endpoint was hit")
    return jsonify({'status': 'ok'}), 200

# تلخيص النص
@app.route('/summarize', methods=['POST'])
def summarize():
    print("Summarize endpoint was hit")
    data = request.get_json()
    text = data.get('text', '')
    if not text.strip():
        return jsonify({'error': 'نص التلخيص فارغ'}), 400
    summary = summarize_text(text)
    return jsonify({'summary': summary})

# استخراج نص من صورة
@app.route('/upload', methods=['POST'])
def upload_image():
    print("Upload endpoint was hit")
    if 'image' not in request.files:
        return jsonify({'error': 'لا يوجد صورة مرفوعة'}), 400

    file = request.files['image']
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    extracted_text = extract_text_from_image(file_path)
    return jsonify({'extracted_text': extracted_text})

# تشغيل السيرفر
if __name__ == '__main__':
           port =
int(os.environ.get('PORT',8080))
    app.run(host="0.0.0.0", port=port)
