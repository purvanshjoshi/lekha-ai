from agents.lekha_agent import LekhaAgent
from agents.schemas import InvoiceSchema
from typing import List

# Initialize the Parser Agent (Agent Zero)
parser_agent = LekhaAgent(
    name='Agent Zero',
    result_type=List[InvoiceSchema],
    system_prompt=(
        "You are Agent Zero of the Lekha.ai Swarm. Your role is 'Semantic Extraction'. "
        "Extract every invoice into a structured list precisely."
    )
)

async def extract_invoices(raw_text: str) -> List[InvoiceSchema]:
    """Applies Agent Zero's intelligence to raw text."""
    result = await parser_agent.run(raw_text)
    return result.data
