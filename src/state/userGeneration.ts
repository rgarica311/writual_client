import { create } from 'zustand'
import { Projects } from '@/types/types'
import { CREATE_PROJECT } from '../queries'

type ColumnVisibility = {[key: string] : boolean}
type FilterStatus = {[key: string]: {selected: boolean, label: string}}

interface UserState {
    outlines: string[] | []
    projects: Projects
    columnVisibility: ColumnVisibility
    filterStatus: FilterStatus
    setColumnVisibility: (columnVisibility: ColumnVisibility) => void
    setFilterStatus: (filterStatus: FilterStatus) => void
    setProjects: (projects: Projects) => void
    setOutlines: (outlines: [string]) => void
}

export const useUserStore = create<UserState>()((set) => ({
    outlines: ["test", "test2"],
    projects: [],
    columnVisibility: {},
    filterStatus: {},
    setColumnVisibility: (columnVisibility: ColumnVisibility) => set({ columnVisibility }),
    setFilterStatus: (filterStatus: FilterStatus) => set({ filterStatus }),
    setProjects: (projects: Projects) => set({ projects }),
    setOutlines: (outlines: [string]) => set({ outlines })
}))

interface ProjectTableState {
    createStatement: string,
    setCreateStatement: (createStatement: string) => void
}

export const useProjectTableState = create<ProjectTableState>()((set) => ({
    createStatement: "",
    setCreateStatement: (createStatement: string) =>  set({ createStatement })
}))