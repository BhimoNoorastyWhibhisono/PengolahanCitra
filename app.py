from flask import Flask, request, jsonify
from PIL import Image, ImageOps, ImageEnhance
import base64
import io

app = Flask(__name__)

# Function to process image
def process_image(image, operation):
    img = Image.open(io.BytesIO(base64.b64decode(image.split(',')[1])))
    
    if operation == 'grayscale':
        img = ImageOps.grayscale(img)
    elif operation == 'rotate':
        img = img.rotate(90, expand=True)
    elif operation == 'threshold':
        img = img.convert('L')
        img = img.point(lambda p: p > 128 and 255)
    elif operation == 'brightness':
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(1.5)  # Increase brightness by 50%
    elif operation == 'flip':
        img = ImageOps.mirror(img)
    
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue()).decode()

@app.route('/process_image', methods=['POST'])
def process_image_route():
    data = request.get_json()
    image = data['image']
    operation = data['operation']
    processed_image = process_image(image, operation)
    return jsonify({'processed_image': processed_image})

if __name__ == '__main__':
    app.run(debug=True)
