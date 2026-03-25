from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Lekha.ai API", version="1.0.0")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Lekha.ai API is operational", "status": "healthy"}

from services.parser import parser_service

@app.post("/upload")
async def upload_files(gstr2a: UploadFile = File(...), purchase_register: UploadFile = File(...)):
    # Part 1: Basic Parsing and Validation
    gstr2a_content = await gstr2a.read()
    purchase_content = await purchase_register.read()
    
    # Process files (Agent Zero)
    gstr2a_invoices = parser_service.parse_gstr2a_pdf(gstr2a_content)
    purchase_invoices = parser_service.parse_purchase_register(
        purchase_content, 
        purchase_register.filename.split('.')[-1]
    )
    
    return {
        "status": "success",
        "message": "Analysis in progress",
        "counts": {
            "gstr2a": len(gstr2a_invoices),
            "purchase_register": len(purchase_invoices)
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
