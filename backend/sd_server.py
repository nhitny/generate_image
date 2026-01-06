from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
import torch
import base64
from io import BytesIO

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

print("⏳ Loading Stable Diffusion v1.5...")

model_id = "sd-legacy/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    cache_dir="./models"
)

if torch.cuda.is_available():
    pipe = pipe.to("cuda")
    print("🚀 Model loaded on CUDA")
else:
    pipe = pipe.to("cpu")
    print("⚠️ CUDA not available, using CPU")

class GenerateRequest(BaseModel):
    prompt: str

@app.post("/generate")
def generate_image(req: GenerateRequest):
    image = pipe(req.prompt).images[0]

    buffer = BytesIO()
    image.save(buffer, format="PNG")
    img_base64 = base64.b64encode(buffer.getvalue()).decode()

    return {
        "success": True,
        "image": img_base64
    }


# CUDA_VISIBLE_DEVICES=4 python -m uvicorn sd_server:app --host 0.0.0.0 --port 8000
