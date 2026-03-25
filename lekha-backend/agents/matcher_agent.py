from pydantic_ai import Agent
from agents.schemas import InvoiceSchema, ReconResult
from typing import List, Tuple
from rapidfuzz import fuzz

# Initialize the Matcher Agent (Agent One)
matcher_agent = Agent(
    'openai:gpt-4o',
    result_type=ReconResult,
    system_prompt=(
        "You are Agent One of the Lekha.ai Swarm. Your role is 'Bayesian Recon'. "
        "Take two potentially matching invoices—one from GSTR-2A and one from the Purchase Register. "
        "Calculate a 'Confidence Score' for the match. Account for common OCR errors (0 vs O) or "
        "slight date variances. If the status is a mismatch, provide a clear, human-readable reason "
        "(XAI trace). Flag the exact amount of 'Lost Capital' if ITC is blocked."
    )
)

async def reconcile_pair(inv_a: InvoiceSchema, inv_b: InvoiceSchema) -> ReconResult:
    """Matches two invoices and returns a detailed reconciliation report."""
    raw_data = f"A: {inv_a.json()}\nB: {inv_b.json()}"
    result = await matcher_agent.run(raw_data)
    return result.data
