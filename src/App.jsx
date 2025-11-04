import React, { useState } from "react";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");

    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        const response = await fetch(
          "https://73pv8qfwk3.execute-api.ap-southeast-2.amazonaws.com/prod/analyze", // replace this with your actual API endpoint
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image_base64: base64 }),
          }
        );
        const data = await response.json();
        const parsedBody = JSON.parse(data.body);
        setResult(parsedBody);
      } catch (error) {
        console.error(error);
        alert("Error analyzing image.");
      }
      setLoading(false);
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="app">
      <h1>AI Image Classifier</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>
      {result && (
        <div className="result">
          <h3>Prediction:</h3>
          <p>{result.label}</p>
          <p>Confidence: {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
