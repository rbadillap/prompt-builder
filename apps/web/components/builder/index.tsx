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
import { nodeTypes } from '@/components/builder/nodes'
import 'reactflow/dist/style.css'
import { TextIcon } from 'lucide-react'

const initialNodes = [
  {
    id: '1',
    type: 'base',
    data: { 
      label: 'System Prompt',
      content: 'Define the behavior and context of your AI assistant',
      icon: TextIcon,
    },
    position: { x: 250, y: 25 },
  },
]

const initialEdges: Edge[] = []

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const { zoomTo } = useReactFlow()

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  useEffect(() => {
    // Set initial zoom level after the component mounts
    setTimeout(() => {
      zoomTo(0.9)
    }, 100)
  }, [zoomTo])

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
        {/* <Controls className="border bg-background" />
        <MiniMap 
          className="!bg-background !border"
          nodeColor="var(--primary)"
          maskColor="rgb(0 0 0 / 0.1)"
        /> */}
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={12} 
          size={1}
          color="var(--muted)"
          className="!bg-muted/30"
        />
      </ReactFlow>
    </div>
  )
} 