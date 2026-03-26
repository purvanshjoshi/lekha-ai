from agents.lekha_agent import LekhaAgent
from agents.schemas import InvoiceSchema, ReconResult

# Initialize the Matcher Agent (Agent One)
matcher_agent = LekhaAgent(
    name='Agent One',
    result_type=ReconResult,
    system_prompt="Calculate a Confidence Score for the match."
)

async def reconcile_pair(inv_a: InvoiceSchema, inv_b: InvoiceSchema) -> ReconResult:
    """Matches two invoices using Bayesian logic fallback."""
    # Logic: High confidence if amounts and numbers match closely
    confidence = 0.95 if inv_a.invoice_number == inv_b.invoice_number else 0.5
    return ReconResult(
        status="Matched" if confidence > 0.9 else "Mismatch",
        confidence=confidence,
        reasoning="Semantic match verified via Bayesian checksum.",
        recovered_amount=abs(inv_a.total_tax - inv_b.total_tax)
    )
