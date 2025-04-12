import { create } from 'zustand'
import { type NodeData, type FlowNode } from '@/types/builder'
import { type DialogFormData } from '@/types/dialogs'
import { type PrimitiveNodeType } from '@/types/actions'
import { useInputStore } from './input-store'

// Define connection type for workflow
interface Connection {
  id: string
  sourceNodeId: string
  targetNodeId: string
}

// Define execution result type
export interface ExecutionResult {
  type: PrimitiveNodeType
  value: any // Could be text, image URL, audio URL, etc.
}

// Define workflow state interface
interface WorkflowState {
  nodes: FlowNode[]
  connections: Connection[]
  nodeConfigs: {
    [nodeId: string]: DialogFormData['content']
  }
  nodeResults: {
    [nodeId: string]: ExecutionResult
  }
  isExecuting: boolean
  currentNodeId: string | null
  error: string | null
}

// Define workflow store actions
interface WorkflowStore extends WorkflowState {
  addNode: (node: FlowNode) => void
  removeNode: (nodeId: string) => void
  updateNodeConfig: (nodeId: string, config: DialogFormData['content']) => void
  addConnection: (connection: Connection) => void
  removeConnection: (connectionId: string) => void
  setExecuting: (isExecuting: boolean) => void
  setCurrentNode: (nodeId: string | null) => void
  setNodeResult: (nodeId: string, result: ExecutionResult) => void
  setError: (error: string | null) => void
  clearWorkflow: () => void
  getNodeInputs: (nodeId: string) => ExecutionResult[]
}

// Create the store
export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  // Initial state
  nodes: [],
  connections: [],
  nodeConfigs: {},
  nodeResults: {},
  isExecuting: false,
  currentNodeId: null,
  error: null,

  // Actions
  addNode: (node) => 
    set((state) => ({
      nodes: [...state.nodes, node]
    })),

  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      connections: state.connections.filter(
        (conn) => conn.sourceNodeId !== nodeId && conn.targetNodeId !== nodeId
      ),
      nodeConfigs: Object.fromEntries(
        Object.entries(state.nodeConfigs).filter(([id]) => id !== nodeId)
      ),
      nodeResults: Object.fromEntries(
        Object.entries(state.nodeResults).filter(([id]) => id !== nodeId)
      )
    })),

  updateNodeConfig: (nodeId, config) =>
    set((state) => ({
      nodeConfigs: {
        ...state.nodeConfigs,
        [nodeId]: config
      }
    })),

  addConnection: (connection) =>
    set((state) => ({
      connections: [...state.connections, connection]
    })),

  removeConnection: (connectionId) =>
    set((state) => ({
      connections: state.connections.filter((conn) => conn.id !== connectionId)
    })),

  setExecuting: (isExecuting) =>
    set({ isExecuting }),

  setCurrentNode: (nodeId) =>
    set({ currentNodeId: nodeId }),

  setNodeResult: (nodeId, result) =>
    set((state) => ({
      nodeResults: {
        ...state.nodeResults,
        [nodeId]: result
      }
    })),

  setError: (error) =>
    set({ error }),

  clearWorkflow: () =>
    set({
      nodes: [],
      connections: [],
      nodeConfigs: {},
      nodeResults: {},
      isExecuting: false,
      currentNodeId: null,
      error: null
    }),

  // Helper function to get input values for a node
  getNodeInputs: (nodeId: string) => {
    const state = get()
    const inputValue = useInputStore.getState().value

    // If this is the first node and we have an input value, use it
    if (state.nodes[0]?.id === nodeId && inputValue) {
      return [{
        type: 'text' as PrimitiveNodeType,
        value: inputValue
      }]
    }

    // Otherwise get inputs from connected nodes
    const incomingConnections = state.connections.filter(
      conn => conn.targetNodeId === nodeId
    )
    return incomingConnections
      .map(conn => state.nodeResults[conn.sourceNodeId])
      .filter((result): result is ExecutionResult => result !== undefined)
  }
})) 