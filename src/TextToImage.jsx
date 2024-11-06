// src/TextToImage.jsx
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import backgroundImage from "/backgroundImage.png";
import "./TextToImage.css"; // Import the CSS file

const TextToImage = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const divRef = useRef();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = () => {
    if (divRef.current) {
      html2canvas(divRef.current).then((canvas) => {
        const dataURL = canvas.toDataURL("image/png");
        setImageUrl(dataURL);
      });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Make Your Poster <br/> I support Shri Chandrashekhar Bawankule</h1>
     
      <div ref={divRef} className="image-container">
        <img
          src={backgroundImage}
          alt="Background Image"
          className="background-image"
        />
        <div className="text-overlay">
          <div className="overlay-text">
          <h4 >{text}</h4>
          </div>
          
          {uploadedImage && (
            <span className="overlay-image-container">
              <img
                src={uploadedImage}
                alt="Overlay Image"
                className="overlay-image"
              />
            </span>
          )}
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="file-input"
      />
      <input
        placeholder="Enter your text here"
        value={text}
        onChange={handleTextChange}
        className="text-input"
      />
      <button onClick={generateImage} className="convert-button">
        Convert to Image
      </button>
      {imageUrl && (
        <div className="generated-section">
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Converted Div" className="generated-image" />
          <br />
          <a
            href={imageUrl}
            download={`${text.replaceAll(" ", "-")}.png`}
            className="download-button"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default TextToImage;
