# Copyright by Mahendra Ribadiya - Founder of https://www.Heymate.in -
#Hire Our company for anykind of AI , Flask, Django, Next.js, Iot Startup or Projects
from flask import Flask, request, jsonify
import cv2
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_skin():
    # Get the image from the request
    image_file = request.files['image'].read()
    image = Image.open(io.BytesIO(image_file))

    # Convert image to a numpy array for OpenCV processing
    img_array = np.array(image)

    # Process image (e.g., detect skin tones, blemishes, etc.)
    result = process_image(img_array)

    return jsonify({"result": result})
# Copyright by Mahendra Ribadiya - Founder of https://www.Heymate.in
def process_image(img):
    # Example: Convert to grayscale (you can implement actual skin analysis here)
    gray_image = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Further analysis logic here...
    return {"analysis": "placeholder for actual skin analysis"}

if __name__ == '__main__':
    app.run(debug=True)
# Copyright by Mahendra Ribadiya - Founder of https://www.Heymate.in
