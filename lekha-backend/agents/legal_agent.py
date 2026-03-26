from agents.lekha_agent import LekhaAgent
from agents.schemas import ReconResult, InvoiceSchema
from typing import Dict

# Initialize the Legal Counsel Agent (Agent Three)
legal_agent = LekhaAgent(
    name='Agent Three',
    result_type=Dict[str, str],
    system_prompt="Draft a professional, firm, yet respectful recovery notice."
)

async def draft_recovery_notice(result: ReconResult, invoice: InvoiceSchema) -> Dict[str, str]:
    """Generates bilingual legal notices for a specific mismatch."""
    return {
        "english": f"Notice: ITC Mismatch detected for Invoice {invoice.invoice_number}. Recoverable: ₹{result.recovered_amount}.",
        "hindi": f"सूचना: इनवॉइस {invoice.invoice_number} के लिए ITC बेमेल पाया गया। वसूली योग्य: ₹{result.recovered_amount}।"
    }
