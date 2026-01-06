
# Stable Diffusion Banana Image Generator 🍌🎨

Ứng dụng tạo ảnh từ văn bản (Text-to-Image) sử dụng **Stable Diffusion v1.5 chạy local**.  
---

## 📁 Cấu trúc project

```

gemini-banana-generate-image
│
├── backend
│   ├── models/
│   │   └── models--sd-legacy--stable-diffusion-v1-5/
│   ├── sd_server.py
│
├── frontend
│   ├── src/
│   ├── .next/
│   ├── node_modules/
│   ├── package.json
│   ├── next.config.mjs
│
├── .gitignore
├── README.md
├── requirements.txt
```
---

## 🧠 Model sử dụng

- **Stable Diffusion v1.5 (sd-legacy)**
````
## ⚙️ Yêu cầu hệ thống

### Backend
- Python **>= 3.9**
- RAM khuyến nghị: **8GB+**
- Hỗ trợ **GPU (CUDA)** hoặc **CPU**

### Frontend
- Node.js **>= 18**
- npm hoặc yarn
---

## 🚀 Chạy Backend

Cài thư viện:

```bash
pip install -r requirements.txt
````

Chạy server:

```bash
CUDA_VISIBLE_DEVICES=4 python -m uvicorn sd_server:app --host 0.0.0.0 --port 8000
```

Backend chạy tại:

```
http://localhost:8000
```
---

## 🌐 Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

Truy cập:

```
http://localhost:3000
```

---

## 🔄 Luồng hoạt động

1. Người dùng nhập prompt trên giao diện
2. Frontend gửi request đến backend
3. Backend load Stable Diffusion từ local và sinh ảnh
4. Ảnh được trả về và hiển thị trên frontend
---

## 📜 License
