
import { useRef, useState } from 'react';

export default function Home() {
    const videoRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => console.error('Error accessing webcam: ', err));
    };

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        setImageSrc(imageData);

        // Send image to the backend
        fetch('http://localhost:5000/analyze', {
            method: 'POST',
            body: imageData,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error('Error analyzing image: ', err));
    };

    return (
        <div>
            <button onClick={startVideo}>Start Webcam</button>
            <video ref={videoRef} autoPlay />
            <button onClick={captureImage}>Capture Image</button>
            {imageSrc && <img src={imageSrc} alt="Captured" />}
        </div>
    );
}
