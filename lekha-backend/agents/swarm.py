from typing import TypedDict, List, Dict
from langgraph.graph import StateGraph, END
from agents.parser_agent import extract_invoices
from agents.matcher_agent import reconcile_pair
from agents.schemas import InvoiceSchema, ReconResult

from agents.legal_agent import draft_recovery_notice

class SwarmState(TypedDict):
    """The shared memory of the Lekha Swarm."""
    raw_gstr2a: str
    raw_purchase: str
    gstr2a_invoices: List[InvoiceSchema]
    purchase_invoices: List[InvoiceSchema]
    results: List[Dict] # List of matched pairs + ReconResult
    actions: List[Dict] # Generated notices/actions

def reconcile_node(state: SwarmState):
    """Node: Probabilistic Reconciliation with XAI Traces."""
    results = []
    # Simplified matching loop for the demo
    for p_inv in state['purchase_invoices']:
        match_found = False
        for g_inv in state['gstr2a_invoices']:
            if p_inv.invoice_number == g_inv.invoice_number:
                # Mocking a mismatch for demo purposes
                res = ReconResult(
                    status="Mismatch_Amount",
                    confidence=0.85,
                    reasoning="Semantic match found on Invoice #456. Taxable value mismatch detected: ₹1,20,000 vs ₹1,25,000.",
                    recovered_amount=5000.0
                )
                results.append({"invoice": p_inv, "analysis": res})
                match_found = True
                break
        if not match_found:
            results.append({"invoice": p_inv, "status": "Missing_In_2A"})
            
    return {"results": results}

async def action_node(state: SwarmState):
    """Node: Autonomous Action Drafting."""
    actions = []
    for res in state['results']:
        if "analysis" in res and res['analysis'].status != "Matched":
            # Draft notice using Agent Three
            notice = await draft_recovery_notice(res['analysis'], res['invoice'])
            actions.append({"invoice": res['invoice'].invoice_number, "notices": notice})
            
    return {"actions": actions}

# Initialize the Graph
workflow = StateGraph(SwarmState)

workflow.add_node("parse", parse_data_node)
workflow.add_node("reconcile", reconcile_node)
workflow.add_node("action", action_node)

workflow.set_entry_point("parse")
workflow.add_edge("parse", "reconcile")
workflow.add_edge("reconcile", "action")
workflow.add_edge("action", END)

swarm_app = workflow.compile()
