import { useCallback } from 'react'
import { useWorkflowStore } from '@/store/workflow-store'
import { type FlowNode } from '@/types/builder'
import { useChatExecution } from './use-chat-execution'

export function useWorkflowExecution() {
  const {
    nodes,
    connections,
    nodeConfigs,
    isExecuting,
    currentNodeId,
    setExecuting,
    setCurrentNode,
    setNodeResult,
    setError,
    getNodeInputs
  } = useWorkflowStore()

  const { executeChat, reset: resetChat } = useChatExecution()

  // Get nodes in execution order (topological sort)
  const getExecutionOrder = useCallback(() => {
    console.log('🔍 Calculating execution order...')
    const visited = new Set<string>()
    const order: FlowNode[] = []
    
    // Helper function for depth-first search
    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)
      
      // Get all outgoing connections from this node
      const outgoing = connections.filter(conn => conn.sourceNodeId === nodeId)
      for (const conn of outgoing) {
        visit(conn.targetNodeId)
      }
      
      const node = nodes.find(n => n.id === nodeId)
      if (node) order.unshift(node)
    }
    
    // Find root nodes (nodes with no incoming connections)
    const rootNodes = nodes.filter(node => 
      !connections.some(conn => conn.targetNodeId === node.id)
    )
    
    // Visit each root node
    rootNodes.forEach(node => visit(node.id))
    
    console.log('📋 Execution order:', order.map(n => ({ id: n.id, type: n.type })))
    return order
  }, [nodes, connections])

  // Execute a single node
  const executeNode = useCallback(async (node: FlowNode) => {
    console.log(`🎯 Executing node: ${node.id} (${node.type})`)
    try {
      setCurrentNode(node.id)
      const config = nodeConfigs[node.id]
      const inputs = getNodeInputs(node.id)
      
      console.log('📥 Node inputs:', inputs)
      console.log('⚙️ Node config:', config)

      // Execute the chat action and store the result
      const result = await executeChat(config, inputs)
      console.log('📤 Node result:', result)
      
      setNodeResult(node.id, result)
      console.log(`✅ Node ${node.id} executed successfully`)
      return true
    } catch (error) {
      console.error(`❌ Error executing node ${node.id}:`, error)
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
      return false
    }
  }, [nodeConfigs, setCurrentNode, setNodeResult, setError, getNodeInputs, executeChat])

  // Execute the entire workflow
  const executeWorkflow = useCallback(async () => {
    console.log('🔄 executeWorkflow isExecuting:', isExecuting)
    if (isExecuting) {
      console.log('⏳ Workflow already executing, skipping...')
      return
    }
    
    console.log('🚀 Starting workflow execution...')
    try {
      setError(null)
      setExecuting(true)
      resetChat() // Reset chat messages before starting new workflow
      
      const executionOrder = getExecutionOrder()
      
      for (const node of executionOrder) {
        const success = await executeNode(node)
        if (!success) {
          console.error(`❌ Workflow failed at node ${node.id}`)
          throw new Error(`Failed to execute node: ${node.id}`)
        }
      }
      console.log('✨ Workflow completed successfully')
    } catch (error) {
      console.error('💥 Workflow execution failed:', error)
      setError(error instanceof Error ? error.message : 'Workflow execution failed')
    } finally {
      setExecuting(false)
      setCurrentNode(null)
      console.log('🏁 Workflow execution finished')
    }
  }, [isExecuting, getExecutionOrder, executeNode, setExecuting, setCurrentNode, setError, resetChat])

  return {
    executeWorkflow,
    isExecuting,
    currentNodeId
  }
} 