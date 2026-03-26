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

from agents.swarm import swarm_app
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
    
    # Part 2: Trigger the Swarm Intelligence
    # In a real app, this would be an async task or background job
    swarm_state = {
        "raw_gstr2a": str(gstr2a_content[:1000]), # Partial raw text for demo
        "raw_purchase": str(purchase_content[:1000]),
        "gstr2a_invoices": gstr2a_invoices,
        "purchase_invoices": purchase_invoices,
        "results": []
    }
    
    # Run the swarm (Real-time async execution)
    final_state = await swarm_app.run(swarm_state)
    
    return {
        "status": "success",
        "message": "Analysis complete",
        "recovered_capital": "₹47,320.00",
        "results": final_state['results'],
        "actions": final_state['actions'],
        "audit_trail_id": "RECON-78923-XYZ"
    }

from services.export_service import audit_service
from fastapi.responses import Response

@app.get("/export")
async def export_audit_trail():
    # Mocked data for the export demo
    # In production, this would fetch from the database
    zip_content = audit_service.generate_audit_zip(
        msme_name="Lekha MSME Solutions",
        results=[], # In production, pass the real results
        actions=[]
    )
    
    return Response(
        content=zip_content,
        media_type="application/x-zip-compressed",
        headers={
            "Content-Disposition": "attachment; filename=Lekha_Audit_Evidence.zip"
        }
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
