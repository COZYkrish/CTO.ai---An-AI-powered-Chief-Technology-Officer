// ─── Cinematic Types ────────────────────────────────────────
export type SceneId =
  | 'scene01_idea'
  | 'scene02_chaos'
  | 'scene03_death'
  | 'scene04_activation'
  | 'scene05_evolution'
  | 'scene06_agents'
  | 'scene07_consequences'
  | 'scene08_blueprint'
  | 'scene09_casestudies'
  | 'scene10_builders'
  | 'scene11_timeline'
  | 'scene12_reveal'

export type CTOCoreState =
  | 'dormant'
  | 'disturbed'
  | 'still'
  | 'activating'
  | 'working'
  | 'networked'
  | 'architecting'
  | 'evolved'

export interface SceneConfig {
  id: SceneId
  scrollStart: number // % of total scroll 0-100
  scrollEnd: number
  coreState: CTOCoreState
  cameraPosition: [number, number, number]
  title: string
}

export interface CameraKeyframe {
  progress: number // 0-1
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}
