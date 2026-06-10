import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthUser {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UIStore {
  // Auth
  user: AuthUser | null
  isAuthenticated: boolean
  
  // UI State
  sidebarOpen: boolean
  commandPaletteOpen: boolean
  activePanel: string | null
  
  // Actions
  login: (user: AuthUser) => void
  logout: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setCommandPaletteOpen: (open: boolean) => void
  setActivePanel: (panel: string | null) => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      sidebarOpen: true,
      commandPaletteOpen: false,
      activePanel: null,

      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      setActivePanel: (panel) => set({ activePanel: panel }),
    }),
    {
      name: 'ctoai-ui',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
