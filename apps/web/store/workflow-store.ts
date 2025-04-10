import { create } from 'zustand'
import { type NodeData, type FlowNode } from '@/types/builder'
import { type DialogFormData } from '@/types/dialogs'

// Define connection type for workflow
interface Connection {
  id: string
  sourceNodeId: string
  targetNodeId: string
}

// Define workflow state interface
interface WorkflowState {
  nodes: FlowNode[]
  connections: Connection[]
  nodeConfigs: {
    [nodeId: string]: DialogFormData['content']
  }
  isExecuting: boolean
  currentNodeId: string | null
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
  clearWorkflow: () => void
}

// Create the store
export const useWorkflowStore = create<WorkflowStore>((set) => ({
  // Initial state
  nodes: [],
  connections: [],
  nodeConfigs: {},
  isExecuting: false,
  currentNodeId: null,

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

  clearWorkflow: () =>
    set({
      nodes: [],
      connections: [],
      nodeConfigs: {},
      isExecuting: false,
      currentNodeId: null
    })
})) 