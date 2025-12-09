import React, { useState } from "react";
import "./App.css";

function App() {
  const [role, setRole] = useState(null); // "admin" | "user" | "guest"
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setResult(null);
    setImage(null);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");
    if (role === "guest") return alert("Guests cannot upload images.");

    setLoading(true);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        const response = await fetch(
          "https://73pv8qfwk3.execute-api.ap-southeast-2.amazonaws.com/prod/analyze",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image_base64: base64 }),
          }
        );
        const data = await response.json();
        const parsed = JSON.parse(data.body); 
        console.log("AI Parsed Result:", parsed);
        setResult(parsed);
      } catch (error) {
        console.error(error);
        alert("Error analyzing image.");
      }
      setLoading(false);
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="app-container">
      <div className="card">
        {/* ROLE SELECTION */}
        {!role && (
          <>
            <h2>Select Your Role</h2>
            <button onClick={() => handleLogin("admin")}>Admin</button>
            <button onClick={() => handleLogin("user")}>User</button>
            <button onClick={() => handleLogin("guest")}>Guest</button>
          </>
        )}

        {/* MAIN APP */}
        {role && (
          <>
            <h1>AI Image Classifier</h1>
            <p>You are logged in as: <strong>{role.toUpperCase()}</strong></p>

            <button onClick={() => setRole(null)} className="logout-btn">
              Log Out
            </button>

            {/* GUEST RESTRICTION */}
            {role === "guest" && (
              <p style={{ color: "red", marginTop: "10px" }}>
                Guests cannot upload images — please log in as User or Admin.
              </p>
            )}

            {/* INPUT FIELD (hidden for guest) */}
            {(role === "admin" || role === "user") && (
              <>
                <input type="file" accept="image/*" onChange={handleFileChange} />

                <button onClick={handleUpload} disabled={loading}>
                  {loading ? "Analyzing..." : "Upload & Analyze"}
                </button>
              </>
            )}

            {/* IMAGE PREVIEW */}
            {image && (
              <div className="preview">
                <img src={URL.createObjectURL(image)} alt="preview" />
              </div>
            )}

            {/* RESULTS */}
            {result && (
              <div className="result">
                <h3>Prediction:</h3>
                <p>{result.label ? result.label : "No label detected"}</p>
                {"confidence" in result ? (
                  <p>Confidence: {result.confidence.toFixed(2)}%</p>
                ) : (
                  <p>Confidence: N/A</p>
                )}
              </div>
            )}

            {/* ADMIN SPECIAL FEATURE */}
            {role === "admin" && (
              <div className="admin-box">
                <h3>Admin Tools</h3>
                <p>• View logs (coming soon)</p>
                <p>• Manage access (IAM simulation)</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
