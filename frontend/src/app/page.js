"use client";

import { useState } from "react";

const API_BASE = "http://localhost:8000";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setImage(null);

    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Generate failed");
      }

      setImage(`data:image/png;base64,${data.image}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">❤</span>
          <h1>Image Generator</h1>
        </div>
      </header>

      <main className="main-content">
        <section className="card">
          <h2 className="section-title">✏️ Nhập mô tả hình ảnh</h2>

          <textarea
            className="prompt-input"
            placeholder="Ví dụ: A futuristic city at sunset with flying cars..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "⚡ Tạo hình ảnh"}
          </button>

          {error && <p className="error-text">{error}</p>}
        </section>

        <section className="card">
          <h2 className="section-title">🖼️ Kết quả</h2>

          {!image && !loading && (
            <div className="empty-state">
              <p>Hình ảnh của bạn sẽ xuất hiện ở đây</p>
            </div>
          )}

          {loading && <p>Đang tạo hình ảnh...</p>}

          {image && (
            <img src={image} alt="Generated" className="generated-image" />
          )}
        </section>
      </main>
    </div>
  );
}
