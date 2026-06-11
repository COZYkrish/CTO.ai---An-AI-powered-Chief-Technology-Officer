import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Project, Blueprint, GenerationStep } from '../types/blueprint'

interface BlueprintStore {
  projects: Project[]
  activeProjectId: string | null
  generationSteps: GenerationStep[]
  isGenerating: boolean
  
  // Actions
  setActiveProject: (id: string) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  setBlueprint: (projectId: string, blueprint: Blueprint) => void
  setGenerationSteps: (steps: GenerationStep[]) => void
  updateGenerationStep: (id: string, status: GenerationStep['status']) => void
  setIsGenerating: (val: boolean) => void
  getActiveProject: () => Project | null
}

export const useBlueprintStore = create<BlueprintStore>()(
  persist(
    (set, get) => ({
      projects: [],
      activeProjectId: null,
      generationSteps: [],
      isGenerating: false,

      setActiveProject: (id) => set({ activeProjectId: id }),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
          activeProjectId: project.id,
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      setBlueprint: (projectId, blueprint) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? { ...p, blueprint, status: 'complete' }
              : p
          ),
        })),

      setGenerationSteps: (steps) => set({ generationSteps: steps }),

      updateGenerationStep: (id, status) =>
        set((state) => ({
          generationSteps: state.generationSteps.map((s) =>
            s.id === id ? { ...s, status } : s
          ),
        })),

      setIsGenerating: (val) => set({ isGenerating: val }),

      getActiveProject: () => {
        const { projects, activeProjectId } = get()
        return projects.find((p) => p.id === activeProjectId) ?? null
      },
    }),
    {
      name: 'ctoai-projects-v2',
      partialize: (state) => ({
        projects: state.projects,
        activeProjectId: state.activeProjectId,
      }),
    }
  )
)
