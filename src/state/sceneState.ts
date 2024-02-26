import { create } from 'zustand'
import { Version} from '@/interfaces/scene'

interface SceneContent {
    thesis: string, 
    antithesis: string, 
    synthesis: string, 
    synopsis: string,
    sceneHeading: string,
    step: string,
    act?: number,
    version: number
}

interface SceneState {
   number: number,
   versions:  Version[],
   editMode: boolean,
   activeVersion: number,
   activeStep: string,
   activeScene: number,
   sceneContent: SceneContent,
   createStatement: string,
   newVersion: boolean,
   handleSave: Function,
   versionOptions: [],
   setVersionOptions: (versionOptions: []) => void,
   setHandleSave: (handleSave: Function) =>  void,
   setNewVersion: (newVersion: boolean) => void,
   setCreateStatement: (createStatement: string) => void
   setSceneContent: (sceneContent: SceneContent) => void
   setActiveScene: (activeScene: number) => void
   setEditMode: (editMode: boolean) => void
   setActiveVersion: (activeVersion: number) => void
   setActiveStep: (activeStep: string) => void
}

export const sceneStore = create<SceneState>((set) => ({
    number: 1,
    versions: [],
    editMode: false,
    activeVersion: 0,
    activeStep: "",
    activeScene: 1,
    sceneContent: {
        thesis: "",
        antithesis:"",
        synthesis: "",
        synopsis: "",
        sceneHeading: "",
        step: "",
        version: 0
    },
    createStatement: "",
    newVersion: false,
    versionOptions: [],
    setVersionOptions: (versionOptions: []) => set({versionOptions}),
    handleSave: () => {},
    setHandleSave: (handleSave: Function) => set({handleSave}),
    setNewVersion: (newVersion: boolean) => set({newVersion}),
    setCreateStatement: (createStatement: string) => set({createStatement}),
    setSceneContent: (sceneContent: SceneContent) => set({sceneContent}),
    setActiveScene: (activeScene: number) => set({activeScene}),
    setEditMode: (editMode: boolean) => set({ editMode }),
    setActiveVersion: (activeVersion: number) => set({activeVersion}),
    setActiveStep: (activeStep: string) => set({activeStep})
}))