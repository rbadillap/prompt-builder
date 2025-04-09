'use client'

import { useCallback, useEffect } from 'react'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  ConnectionMode,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { BaseNode } from '@/components/builder/nodes'
import { FlowNode, NodeData } from '@/types/builder'

const nodeTypes = {
  base: BaseNode,
}

interface BuilderProps {
  initialNodes?: FlowNode[]
  initialEdges?: Edge[]
}

export function Builder({ initialNodes = [], initialEdges = [] }: BuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { zoomTo } = useReactFlow()

  const isValidConnection = (connection: Connection) => {
    const sourceNode = nodes.find((node) => node.id === connection.source)
    const targetNode = nodes.find((node) => node.id === connection.target)

    if (!sourceNode || !targetNode) return false

    // Get the output type of the source node
    const sourceOutput = (sourceNode.data as NodeData).output
    // Get the accepted input types of the target node
    const targetInputs = (targetNode.data as NodeData).input || []

    // Check if the target node accepts the source node's output type
    return targetInputs.includes(sourceOutput)
  }

  const onConnect = useCallback(
    (connection: Connection) => {
      if (isValidConnection(connection)) {
        setEdges((eds) => addEdge(connection, eds))
      }
    },
    [nodes, setEdges]
  )

  // useEffect(() => {
  //   // Set initial zoom level after the component mounts
  //   setTimeout(() => {
  //     zoomTo(0.9)
  //   }, 100)
  // }, [zoomTo])

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: {
            strokeWidth: 2,
            stroke: 'var(--primary)',
          },
        }}
        fitView
        className="bg-background"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={12} 
          size={1}
          color="var(--muted)"
          className="!bg-muted/30"
        />
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  )
} 