import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useBlueprintStore } from '../../stores/blueprintStore'
import EmptyBlueprintState from '../../components/ui/EmptyBlueprintState'
import ReactFlow, {
  Background, Controls, MiniMap,
  MarkerType,
  type Node, type Edge
} from 'reactflow'
import 'reactflow/dist/style.css'

const typeColors: Record<string, string> = {
  frontend: '#3B82F6', backend: '#06B6D4', database: '#8B5CF6',
  cache: '#F59E0B', queue: '#10B981', storage: '#6366F1',
  api_gateway: '#EC4899', auth: '#EF4444', cdn: '#14B8A6', external: '#6B7280',
}

export default function ArchitectureDesigner() {
  const project = useBlueprintStore((s) => s.getActiveProject())
  const blueprint = project?.blueprint
  if (!blueprint) {
    return <EmptyBlueprintState title="Architecture Designer" />
  }
  const arch = blueprint.architecture

  const nodes: Node[] = arch.components.map((c) => ({
    id: c.id,
    position: c.position ?? { x: Math.random() * 600, y: Math.random() * 400 },
    data: {
      label: (
        <div className="text-center">
          <div className="font-geist font-semibold text-white text-xs mb-0.5">{c.name}</div>
          <div className="text-white/40 text-xs font-mono">{c.technology}</div>
        </div>
      ),
    },
    style: {
      background: `${typeColors[c.type] ?? '#3B82F6'}15`,
      border: `1px solid ${typeColors[c.type] ?? '#3B82F6'}40`,
      borderRadius: '12px',
      padding: '12px 16px',
      color: 'white',
      minWidth: 140,
    },
  }))

  const edges: Edge[] = arch.connections.map((conn, i) => ({
    id: `e-${i}`,
    source: conn.source,
    target: conn.target,
    label: conn.label,
    labelStyle: { fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'monospace' },
    labelBgStyle: { fill: 'rgba(10,15,31,0.8)' },
    animated: conn.animated,
    style: { stroke: 'rgba(59,130,246,0.3)', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(59,130,246,0.5)' },
  }))

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-4 flex-shrink-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-widest mb-2">Architecture Designer</p>
          <h1 className="font-geist font-black text-white mb-1" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', letterSpacing: '-0.03em' }}>
            {arch.pattern}
          </h1>
          <p className="font-inter text-white/35 text-sm">{arch.components.length} components · {arch.connections.length} connections</p>
        </motion.div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(typeColors).slice(0, 6).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5 text-xs font-mono">
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-white/30 capitalize">{type.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* React Flow canvas */}
      <div className="flex-1 mx-8 mb-8 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.06)', minHeight: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: '#050816' }}
        >
          <Background color="rgba(255,255,255,0.03)" gap={24} />
          <Controls style={{ background: 'rgba(10,15,31,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }} />
          <MiniMap
            style={{ background: 'rgba(10,15,31,0.9)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }}
            nodeColor={(n) => {
              const comp = arch.components.find(c => c.id === n.id)
              return comp ? (typeColors[comp.type] ?? '#3B82F6') + '60' : '#3B82F640'
            }}
          />
        </ReactFlow>
      </div>
    </div>
  )
}
