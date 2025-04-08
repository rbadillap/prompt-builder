'use client'

import { Handle, NodeProps, Position } from 'reactflow'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card'
import { NodeData } from '@/types/builder'

export function BaseNode({ data, isConnectable }: NodeProps<NodeData>) {
  return (
    <Card className="min-w-xs border border-dashed border-muted bg-muted/50 shadow-md">
      <CardHeader className="border-b border-accent-foreground/10">
        <CardTitle className="font-medium flex items-center gap-2">
          {data.icon && <data.icon className="w-4 h-4" />}
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Only show input handle if the node accepts inputs */}
        {data.input && data.input.length > 0 && (
          <Handle
            type="target"
            position={Position.Top}
            className="!bg-muted-foreground !w-3 !h-3 !border-2 !border-background"
            isConnectable={isConnectable}
          />
        )}
        <p className="text-sm text-muted-foreground">
          {data.content.display || 'Configure this node'}
        </p>
        {/* All nodes have outputs */}
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-muted-foreground !w-3 !h-3 !border-2 !border-background"
          isConnectable={isConnectable}
        />
      </CardContent>
    </Card>
  )
}

BaseNode.displayName = 'BaseNode'