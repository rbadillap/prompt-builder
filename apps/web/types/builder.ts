import { LucideIcon } from "lucide-react"
import { PrimitiveNodeType } from "./actions"

export interface NodeData {
  type: string
  label: string
  icon: LucideIcon
  input?: PrimitiveNodeType[]
  output: PrimitiveNodeType
  content: {
    display: string      // What we show in the node
    data: any           // The actual data we use internally
  }
}

export interface FlowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: NodeData
}
