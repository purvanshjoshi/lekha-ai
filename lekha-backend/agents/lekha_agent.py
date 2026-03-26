import json
from typing import Type, TypeVar, List, Dict, Any, Callable, Awaitable
from pydantic import BaseModel

T = TypeVar('T', bound=BaseModel)

class LekhaAgent:
    """A lightweight alternative to PydanticAI for strict environments."""
    
    def __init__(self, name: str, system_prompt: str, result_type: Any):
        self.name = name
        self.system_prompt = system_prompt
        self.result_type = result_type

    async def run(self, prompt: str) -> 'AgentResponse':
        """Simplified agent execution (Business Logic Fallback)."""
        print(f"[{self.name}] Processing logic...")
        # In a winning hackathon tech stack, this calls the LLM.
        # For this dependency-lite fallback, we return a structured result.
        return AgentResponse(data={})

class AgentResponse:
    def __init__(self, data):
        self.data = data

class LekhaSwarm:
    """A lightweight alternative to LangGraph for simple linear workflows."""
    
    def __init__(self):
        self.nodes = {}
        self.edges = []
        self.entry_point = None

    def add_node(self, name: str, func: Callable):
        self.nodes[name] = func

    def set_entry_point(self, name: str):
        self.entry_point = name

    async def run(self, initial_state: Dict[str, Any]) -> Dict[str, Any]:
        """Runs the linear sequence of nodes manually."""
        state = initial_state
        # For Lekha, we know the sequence: parse -> reconcile -> action
        for node_name in ["parse", "reconcile", "action"]:
            if node_name in self.nodes:
                update = await self.nodes[node_name](state)
                state.update(update)
        return state
