import { create } from 'zustand'
import { Projects } from 'interfaces'

interface UserState {
    outlines: string[] | []
    projects: Projects
    setProjects: (projects: Projects) => void
    setOutlines: (outlines: [string]) => void
}

export const useUserStore = create<UserState>()((set) => ({
    outlines: ["test", "test2"],
    projects: [],
    setProjects: (projects: Projects) => set({ projects }),
    setOutlines: (outlines: [string]) => set({ outlines })
}))