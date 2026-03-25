from pydantic_ai import Agent
from agents.schemas import ReconResult, InvoiceSchema
from typing import Dict
import os

# Initialize the Legal Counsel Agent (Agent Three)
legal_agent = Agent(
    'openai:gpt-4o',
    result_type=Dict[str, str], # Language -> Notice Mapping
    system_prompt=(
        "You are Agent Three of the Lekha.ai Swarm. Your role is 'Autonomous Legal Action'. "
        "Take a reconciliation mismatch result and the vendor details. "
        "Draft a professional, firm, yet respectful recovery notice. "
        "Generate the notice in both English and Hindi. "
        "Avoid legalese where possible; focus on 'Finding a solution together' but ensure "
        "the financial impact (lost ITC) is clearly stated. Use the MSME's perspective."
    )
)

async def draft_recovery_notice(result: ReconResult, invoice: InvoiceSchema) -> Dict[str, str]:
    """Generates bilingual legal notices for a specific mismatch."""
    prompt = f"Mismatch: {result.reasoning}. Recoverable: ₹{result.recovered_amount}. Invoice: {invoice.invoice_number}."
    result = await legal_agent.run(prompt)
    return result.data
