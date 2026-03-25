from pydantic_ai import Agent
from agents.schemas import InvoiceSchema
from typing import List
import os

# Initialize the Parser Agent (Agent Zero)
parser_agent = Agent(
    'openai:gpt-4o', # Using GPT-4o for complex multi-modal/text reasoning
    result_type=List[InvoiceSchema],
    system_prompt=(
        "You are Agent Zero of the Lekha.ai Swarm. Your role is 'Semantic Extraction'. "
        "Take messy, unstructured text or table data from GSTR-2A PDFs or Purchase Registers. "
        "Extract every invoice into a structured list. Normalize date formats and perform "
        "checksum validation on GSTINs where possible. Be extremely precise with taxable values."
    )
)

async def extract_invoices(raw_text: str) -> List[InvoiceSchema]:
    """Applies Agent Zero's intelligence to raw text."""
    result = await parser_agent.run(raw_text)
    return result.data
