import { useCallback } from 'react'
import { useWorkflowStore } from '@/store/workflow-store'
import { type FlowNode } from '@/types/builder'
import { type Action } from '@/types/actions'

export function useWorkflowExecution() {
  const {
    nodes,
    connections,
    nodeConfigs,
    isExecuting,
    currentNodeId,
    setExecuting,
    setCurrentNode,
  } = useWorkflowStore()

  // Get nodes in execution order (topological sort)
  const getExecutionOrder = useCallback(() => {
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
    
    return order
  }, [nodes, connections])

  // Execute a single node
  const executeNode = useCallback(async (node: FlowNode) => {
    try {
      setCurrentNode(node.id)
      const config = nodeConfigs[node.id]
      
      // Here we'll add the actual execution logic based on node type
      // For now, we'll just log the execution
      console.log('Executing node:', {
        id: node.id,
        type: node.type,
        config,
      })
      
      // TODO: Implement actual node execution logic
      // This will involve:
      // 1. Getting input from previous nodes
      // 2. Executing the action based on node type
      // 3. Storing the output for next nodes
      
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate execution
      
      return true
    } catch (error) {
      console.error('Error executing node:', error)
      return false
    }
  }, [nodeConfigs, setCurrentNode])

  // Execute the entire workflow
  const executeWorkflow = useCallback(async () => {
    if (isExecuting) return
    
    try {
      setExecuting(true)
      const executionOrder = getExecutionOrder()
      
      for (const node of executionOrder) {
        const success = await executeNode(node)
        if (!success) {
          throw new Error(`Failed to execute node: ${node.id}`)
        }
      }
    } catch (error) {
      console.error('Workflow execution failed:', error)
    } finally {
      setExecuting(false)
      setCurrentNode(null)
    }
  }, [isExecuting, getExecutionOrder, executeNode, setExecuting, setCurrentNode])

  return {
    executeWorkflow,
    isExecuting,
    currentNodeId
  }
} 