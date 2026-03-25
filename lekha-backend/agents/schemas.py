from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class InvoiceSchema(BaseModel):
    """Structured data for a single invoice."""
    invoice_number: str = Field(description="Normalized invoice identifier")
    vendor_gstin: str = Field(description="15-character GSTIN of the vendor")
    date: datetime = Field(description="Invoice date in ISO format")
    taxable_value: float = Field(description="Base value before GST")
    igst: float = Field(default=0.0)
    cgst: float = Field(default=0.0)
    sgst: float = Field(default=0.0)
    total_tax: float
    hsn_codes: Optional[List[str]] = Field(default_factory=list)

class ReconResult(BaseModel):
    """Result of a reconciliation attempt."""
    status: str = Field(description="Matched, Missing_In_2A, Mismatch_Amount, etc.")
    confidence: float = Field(description="Probabilistic certainty score (0-1)")
    reasoning: str = Field(description="Explainable AI trace of the decision")
    recovered_amount: float = Field(default=0.0)
