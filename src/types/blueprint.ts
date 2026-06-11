// ─── Blueprint / Project Types ──────────────────────────────

export interface Project {
  id: string
  name: string
  description: string
  idea: string
  createdAt: string
  updatedAt: string
  status: 'generating' | 'complete' | 'draft'
  complexity: number // 1-10
  readiness: number  // 0-100
  techStack: TechStack
  blueprint: Blueprint | null
}

export interface TechStack {
  frontend: string[]
  backend: string[]
  database: string[]
  infrastructure: string[]
  security: string[]
}

export interface Blueprint {
  requirements: Requirements
  architecture: Architecture
  database: DatabaseSchema
  apis: APISpec
  security: SecurityPlan
  infrastructure: InfrastructurePlan
  costs: CostEstimate
  roadmap: SprintPlan
  documentation: Documentation
  engineeringCorps?: EngineeringRole[]
  risks?: RiskItem[]
}

export interface EngineeringRole {
  title: string
  count: number
  priority: 'critical' | 'high' | 'medium' | 'low'
  skills: string[]
  salary: string
}

export interface RiskItem {
  category: string
  name: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  probability: number
  impact: number
  description: string
  mitigation: string
}

export interface Requirements {
  functional: Requirement[]
  nonFunctional: Requirement[]
  userStories: UserStory[]
  acceptanceCriteria: string[]
}

export interface Requirement {
  id: string
  title: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  category: string
}

export interface UserStory {
  id: string
  role: string
  action: string
  benefit: string
  acceptanceCriteria: string[]
  points: number
}

export interface Architecture {
  pattern: string
  rationale: string
  components: ArchComponent[]
  connections: ArchConnection[]
  scalingStrategy: string
}

export interface ArchComponent {
  id: string
  name: string
  type: 'frontend' | 'backend' | 'database' | 'cache' | 'queue' | 'storage' | 'auth' | 'api_gateway' | 'cdn' | 'external'
  description: string
  technology: string
  position?: { x: number; y: number }
}

export interface ArchConnection {
  source: string
  target: string
  label: string
  protocol: string
  animated?: boolean
}

export interface DatabaseSchema {
  type: string
  tables: DBTable[]
  relationships: DBRelationship[]
  indexes: DBIndex[]
}

export interface DBTable {
  name: string
  description: string
  columns: DBColumn[]
}

export interface DBColumn {
  name: string
  type: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
  unique?: boolean
  default?: string
}

export interface DBRelationship {
  from: string
  to: string
  type: 'one-to-one' | 'one-to-many' | 'many-to-many'
  foreignKey: string
}

export interface DBIndex {
  table: string
  columns: string[]
  unique: boolean
  name: string
}

export interface APISpec {
  baseUrl: string
  version: string
  authentication: string
  endpoints: APIEndpoint[]
}

export interface APIEndpoint {
  id: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  auth: boolean
  requestBody?: Record<string, unknown>
  responses: APIResponse[]
  tags: string[]
}

export interface APIResponse {
  status: number
  description: string
  schema?: Record<string, unknown>
}

export interface SecurityPlan {
  score: number // 0-100
  threats: SecurityThreat[]
  owaspChecks: OWASPCheck[]
  recommendations: string[]
}

export interface SecurityThreat {
  name: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  mitigation: string
}

export interface OWASPCheck {
  id: string
  name: string
  status: 'pass' | 'fail' | 'warning'
  recommendation: string
}

export interface InfrastructurePlan {
  provider: 'aws' | 'gcp' | 'azure' | 'vercel' | 'railway'
  services: CloudService[]
  deploymentStrategy: string
  monitoring: string[]
  scaling: ScalingPlan
}

export interface CloudService {
  name: string
  service: string
  purpose: string
  tier: string
  monthlyEstimate: number
}

export interface ScalingPlan {
  horizontal: boolean
  vertical: boolean
  autoScaling: boolean
  loadBalancing: boolean
}

export interface CostEstimate {
  monthly: ScaleTier
  scenarios: {
    users100: ScaleTier
    users1k: ScaleTier
    users10k: ScaleTier
    users100k: ScaleTier
  }
}

export interface ScaleTier {
  total: number
  breakdown: { category: string; amount: number }[]
}

export interface SprintPlan {
  totalSprints: number
  sprintDuration: number // weeks
  sprints: Sprint[]
  milestones: Milestone[]
}

export interface Sprint {
  number: number
  name: string
  goals: string[]
  tasks: SprintTask[]
  estimatedDays: number
}

export interface SprintTask {
  id: string
  title: string
  type: 'feature' | 'infra' | 'bug' | 'docs' | 'testing'
  points: number
  assignee: string
}

export interface Milestone {
  name: string
  sprint: number
  description: string
}

export interface Documentation {
  prd: string
  srs: string
  readme: string
  apiDocs: string
  deploymentGuide: string
}

// ─── Agent Types ─────────────────────────────────────────────
export type AgentId = 'product_manager' | 'architect' | 'database' | 'security' | 'devops'

export interface AgentStatus {
  id: AgentId
  name: string
  status: 'idle' | 'thinking' | 'complete'
  output?: string
}

export interface GenerationStep {
  id: string
  label: string
  status: 'pending' | 'running' | 'complete'
  agentId: AgentId
}
