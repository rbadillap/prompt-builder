'use client'

import { createContext, useContext, useCallback } from 'react'
import { Node, Edge, useReactFlow } from 'reactflow'

interface NodeData {
  type: string
  label: string
  content: any
  icon: React.ElementType
}

interface BuilderContextType {
  addNode: (data: NodeData) => void
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined)

export function useBuilder() {
  const context = useContext(BuilderContext)
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider')
  }
  return context
}

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const { getNodes, setNodes } = useReactFlow()

  const addNode = useCallback(
    (data: NodeData) => {
      const nodes = getNodes()
      const newNodeId = `node-${nodes.length + 1}`
      
      // Calculate position for new node
      // If there are existing nodes, place it below the last one
      const lastNode = nodes[nodes.length - 1]
      const position = lastNode
        ? { x: lastNode.position.x, y: lastNode.position.y + 100 }
        : { x: 250, y: 25 }

      const newNode: Node = {
        id: newNodeId,
        type: 'base',
        position,
        data: {
          label: data.label,
          content: data.content,
          icon: data.icon,
        },
      }

      setNodes((nds) => [...nds, newNode])
    },
    [getNodes, setNodes],
  )

  return (
    <BuilderContext.Provider value={{ addNode }}>
      {children}
    </BuilderContext.Provider>
  )
} 

BuilderProvider.displayName = 'BuilderProvider'