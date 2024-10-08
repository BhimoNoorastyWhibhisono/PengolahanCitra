# Image Processing Web App

## Description

This is a simple web-based image processing application built using **Flask** as the backend and **Bootstrap** for frontend styling. The app allows users to upload an image, apply various image processing operations such as **Grayscale**, **Rotate**, **Threshold**, **Brightness adjustment**, and **Flip**, and then download the processed image.

## Features

- **Load Image**: Users can upload images from their local device.
- **Image Operations**:
  - Convert to **Grayscale**
  - **Rotate** 90 degrees
  - Apply a simple **Threshold**
  - Adjust **Brightness**
  - **Flip** the image horizontally
- **Save Processed Image**: Users can download the processed image back to their device.

## Technologies Used

- **Flask** (Python) for backend API and image processing.
- **Bootstrap** (HTML5, CSS) for responsive and modern frontend design.
- **JavaScript** for client-side interaction with the server and image rendering.
- **Pillow (PIL)** for image processing operations in the backend.
  
## Setup Instructions

### Prerequisites

Make sure you have the following installed on your machine:

- Python 3.x
- pip (Python package manager)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/image-processing-app.git
cd image-processing-app
```

### 2. Install Dependencies

Before running the app, you need to install the required Python libraries:

```bash
pip install flask pillow
```

### 3. Running the Application

To start the Flask server, run the following command:

```bash
python app.py
```

This will start the server at `http://127.0.0.1:5000`.

### 4. Accessing the Web Application

Open your web browser and go to:

```
http://127.0.0.1:5000
```

### 5. Using the Application

1. Click on **Choose File** to upload an image.
2. Select an image from your local device.
3. Apply one of the available operations (Grayscale, Rotate, Threshold, Brightness, or Flip).
4. Click **Save Processed Image** to download the image.

## File Structure

```bash
.
├── app.py              # Flask backend for image processing
├── templates
│   └── index.html      # Frontend HTML file using Bootstrap
├── asset
│   ├── css
│   │   └── style.css   # Optional custom CSS for styling
│   └── js
│       └── app.js      # JavaScript for handling image operations and UI interaction
└── README.md           # This README file


## Customization

You can customize the app by adding more image operations or modifying the user interface. Here are a few ideas:

- Add additional operations like contrast adjustment, image resizing, or image cropping.
- Improve the UI by adding more animations or a progress bar while images are being processed.

## Contributing

Feel free to fork this repository and submit pull requests. Any feedback or suggestions are welcome!

## License

This project is licensed under the MIT License. 
