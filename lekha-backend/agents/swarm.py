from typing import TypedDict, List, Dict
from agents.lekha_agent import LekhaSwarm
from agents.matcher_agent import reconcile_pair
from agents.schemas import InvoiceSchema, ReconResult
from agents.legal_agent import draft_recovery_notice

class SwarmState(TypedDict):
    """The shared memory of the Lekha Swarm."""
    gstr2a_invoices: List[InvoiceSchema]
    purchase_invoices: List[InvoiceSchema]
    results: List[Dict]
    actions: List[Dict]

async def parse_data_node(state: SwarmState):
    """Node: Semantic Extraction Placeholder."""
    return state # Already parsed in main.py for this demo

async def reconcile_node(state: SwarmState):
    """Node: Live Probabilistic Reconciliation using Agent One."""
    results = []
    for p_inv in state['purchase_invoices']:
        match_found = False
        for g_inv in state['gstr2a_invoices']:
            if p_inv.invoice_number == g_inv.invoice_number:
                analysis = await reconcile_pair(p_inv, g_inv)
                results.append({"invoice": p_inv, "analysis": analysis})
                match_found = True
                break
        if not match_found:
            results.append({
                "invoice": p_inv, 
                "analysis": ReconResult(
                    status="Missing_In_2A", 
                    confidence=1.0, 
                    reasoning="No record found in GSTR-2A.", 
                    recovered_amount=p_inv.total_tax
                )
            })
    return {"results": results}

async def action_node(state: SwarmState):
    """Node: Autonomous Action Drafting."""
    actions = []
    for res in state['results']:
        if "analysis" in res and res['analysis'].status != "Matched":
            notice = await draft_recovery_notice(res['analysis'], res['invoice'])
            actions.append({"invoice": res['invoice'].invoice_number, "notices": notice})
    return {"actions": actions}

# Initialize the Custom Swarm
swarm_app = LekhaSwarm()
swarm_app.add_node("parse", parse_data_node)
swarm_app.add_node("reconcile", reconcile_node)
swarm_app.add_node("action", action_node)
swarm_app.set_entry_point("parse")
