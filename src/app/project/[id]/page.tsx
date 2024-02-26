'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Button, Checkbox, Container, Divider, IconButton, Link, MenuItem, MenuList, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { request } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  { CharacterCard } from '../../../components/CharacterCard'
import { StepTabs } from '@/components/StepTabs';
import { projectStyles } from 'styles';
import { Version, Scene} from '../../../interfaces'
import { CustomTabPanel } from '@/shared/CustomTabPanel';
import { PROJECT_QUERY } from '@/queries/ProjectQueries';
import { sceneStore } from '@/state/sceneState';
import { useDebounce } from 'hooks';
import { CREATE_SCENE, UPDATE_SCENE } from "@/queries/SceneQueries"
import { Mutation } from "@/interfaces/scene"
import { useCreateMutation } from 'hooks';
import { createMutation } from '@/helpers/createMutation';
import { GqlStatements } from '@/enums/GqlStatements';

const endpoint = `http://localhost:4000`

export default function Project({ params }) {
    const setEditMode = sceneStore((state) => state.setEditMode)
    const activeStep = sceneStore((state) => state.activeStep)
    const setActiveStep = sceneStore((state) => state.setActiveStep)
    const setActiveScene = sceneStore((state) => state.setActiveScene)
    const activeVersion = sceneStore(state => state.activeVersion)
    const setActiveVersion = sceneStore((state) => state.setActiveVersion)
    const setNewVersion = sceneStore((state) => state.setNewVersion)
    const setHandleSave = sceneStore((state) => state.setHandleSave)
    const createStatement = sceneStore((state) => state.createStatement)
    const setCreateStatement = sceneStore((state) => state.setCreateStatement)

    const versionOptions = sceneStore((state) => state.versionOptions)
    const setVersionOptions = sceneStore((state) => state.setVersionOptions)

    const sceneContent = sceneStore((state) => state.sceneContent)
    const setSceneContent = sceneStore((state) => state.setSceneContent)

    const [ createVariables, setCreateVariables ] = useState<any>()
    const [expandedTop, setExpandedTop] = useState(true)
    const [expandedBottom, setExpandedBottom] = useState(true)
    const [characters, setCharacters] = useState([])
    const [scenes, setScenes] = useState<Array<Scene>>([])
    const [value, setValue] = useState(0);
    const [bottomValue, setBottomValue] = useState(0);
    const [title, setTitle] = useState("")
    const [act, setAct] = useState<number>(0)

    const id = params.id
    

    const variables = {
        input: {
            user: "rory.garcia1@gmail.com", 
            id
        }
        
    }
    
    const { data, isLoading, error }: any = useQuery({queryKey: ['projects'], queryFn: async () => request(endpoint, PROJECT_QUERY, variables)});

    useEffect(() => {
        console.log('debug scene project data isLoading: ', isLoading)
        console.log('debug scene project data: ',  data)
        if(!isLoading) {
            if(data.getProjectData.length > 0) {
                console.log('data: ', data.getProjectData)
                let projectData = data.getProjectData[0]
                setCharacters(projectData.characters)
                setActiveStep(projectData.scenes[0]?.versions[0].step)
                setScenes(projectData.scenes)
                setTitle(projectData.title)
            }
        }
       
    }, [isLoading, data])

    const updateMutationArgs: Mutation = {
        createStatement: UPDATE_SCENE,
        createVariables: createVariables, 
        invalidateQueriesArray: ['projects'],
        stateResetters: {
            setCreateStatement,
            setCreateVariables,
            setVersionOptions,
            setNewVersion
        }
    }

    console.log('debug scene updateMutationArgs: ', updateMutationArgs)

    const createMutationArgs: Mutation = {
        createStatement: CREATE_SCENE,
        createVariables: createVariables, 
        invalidateQueriesArray: ['projects'],
        stateResetters: {
            setCreateStatement,
            setCreateVariables
        }
    }

    const createSceneMutation = createMutation(createMutationArgs)
    useCreateMutation(createStatement, sceneContent, createSceneMutation, GqlStatements.CREATE_SCENE)

    const updateSceneMutation = createMutation(updateMutationArgs)
    useCreateMutation(createStatement, sceneContent, updateSceneMutation, GqlStatements.UPDATE_SCENE)

    const handleSave = useDebounce((
            newVersion: boolean,
            newScene: boolean,
            projectId: string,
            number: number,
            newVersionDisplay: number,
            step: string) => {
        console.log('debug scene update handleSave running')
        if(newScene) {
            console.log('debug scene new scene')
            setCreateStatement(CREATE_SCENE)
            setCreateVariables({act, projectId, newVersion, number, activeVersion, versions: [{
                act,
                thesis: sceneContent.thesis,
                step,
            }]})
        } else {
            //set newVersion correctly
            console.log('debug scene update scene thesis: ', sceneContent.thesis)
            setCreateStatement(UPDATE_SCENE)
            console.log('debug scene create variables: ', {act, projectId, number, versions: [{
                ...sceneContent,
                newVersion,
                version: newVersion ? newVersionDisplay + 1 : sceneContent.version,
                thesis: sceneContent.thesis
            }]})
            setCreateVariables({act, projectId, number, versions: [{
                ...sceneContent,
                newVersion,
                version: newVersion ? newVersionDisplay + 1  : sceneContent.version,
                thesis: sceneContent.thesis
            }]})
        }
    })

    setHandleSave(handleSave)

    const handleBottomChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setBottomValue(newValue);
    };

    const handleActChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log('newValue: ', newValue)
        event.stopPropagation()
        setAct(newValue);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setValue(newValue);
    };
    //console.log('Project params: ', params.id)

    

    

    const toggleAccordionTop = () => {
        setExpandedTop(!expandedTop)
    }

    const toggleAccordionBottom = () => {
        setExpandedBottom(!expandedBottom)
    }

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const actTabProps = (index: number) => {
        return {
            id: `simple-tab=${index}`,
            'aria-controls': `simple-tabpanel-${index}`
        }
    }

    const handleAddScene = (act: number) => {
        console.log(`handleAddScene ran act ${act} step ${activeStep} scenes: `, scenes)
        setActiveScene(scenes.length + 1)
        //setNewVersion(true)

        const newVersion: Scene = {
            act,
            newScene: true,
            number: scenes.length + 1,
            activeVersion: 1,
            projectId: id,
            versions: [{
                act,
                antithesis: "",
                synopsis: "",
                synthesis: "",
                thesis: "",
                version: 1,
                sceneHeading: "",
                step: activeStep
            }]
        }

        setScenes([...scenes, newVersion])
    }

    const handleAddCharacter = () => {

    } 

    const outline = {
        name: "Hero's Journey",
        acts: [ 
            {
                
                label: "Act 1",
                steps: [
                    {
                        stepName: "Ordinary World",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Call To Adventure",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Refusal",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Meeting the Mentor",
                        stepDetails: "The start",
                        stepAct: 1
                    },
                    {
                        stepName: "Threshold",
                        stepDetails: "The start",
                        stepAct: 1
                    }
                ]
                
            },
            {
                label: "Act 2",
                steps: [

                ]
            }

            
        ],
        
    }

    return (
        <>
            <Container  disableGutters sx={projectStyles.tableTopButtons}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/projects">
                        <Typography sx={{width: "100%"}}  variant="h6"> Projects</Typography>
                    </Link>
                   
                    <Typography sx={{width: "100%"}}  variant="h6">{title}</Typography>

                </Breadcrumbs>
            </Container>

            <Accordion disableGutters={true} sx={{marginBottom: "10px"}} expanded={expandedTop} onChange={() => toggleAccordionTop()} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{display: "flex", alignItems: "center", minWidth: "100%"}} >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{fontFamily: "lato"}} label="Characters" {...a11yProps(0)} />
                    <Tab label="Inspo" {...a11yProps(1)} />
                    <Tab label="Chat" {...a11yProps(2)} />
                    <Tab label="Feedback" {...a11yProps(2)} />
                </Tabs>

                </AccordionSummary>
                <AccordionDetails>
                <CustomTabPanel value={value} index={0}>
                    <Container 
                        disableGutters 
                        maxWidth={false} 
                        sx={{display: "flex", flexDirecion: "row", justifyContent: "space-around", flexWrap: "wrap"}}
                        >
                        {
                            characters?.length > 0 
                                ? characters.map((character: any, index: number) => { 
                                    return  <CharacterCard id={index} key={character.name} details={character.details} name={character.name} />
                                })
                                : <Button onClick={handleAddCharacter} variant='contained'>Add Character</Button>

                        }
                    </Container>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Inspo
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Chat
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Feedback
                </CustomTabPanel>
                    
                </AccordionDetails>

            </Accordion>

            <Accordion sx={{order: "1px solid blue"}} disableGutters={true} expanded={expandedBottom} onChange={() => toggleAccordionBottom()} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{display: "flex", alignItems: "center", minWidth: "100%", "&.MuiAccordionSummary-content": {padding: 0}}}>
                    <Tabs sx={projectStyles.tabs}  value={bottomValue} onChange={handleBottomChange} aria-label="basic tabs example">
                        <Tab  label="Treatment" {...a11yProps(0)} />
                        <Tab  label="Scenes" {...a11yProps(1)} />
                        <Tab  label="Srceenplay" {...a11yProps(2)} />
                    </Tabs>
                        
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "13px", minWidth: "100%", height: "calc(100vh - 349px)"}}>
                    <CustomTabPanel value={bottomValue} index={0}>
                        <Container disableGutters sx={{margin: 0, padding: 1}}>Treatment</Container>
                    </CustomTabPanel>
                    
                    <CustomTabPanel value={bottomValue} index={1}>

                        <Tabs variant="fullWidth" sx={projectStyles.tabs} value={act} onChange={handleActChange} aria-label="act tabs">
                            {
                                outline.acts.map((act: any,  index: number) =>  <Tab label={act.label} {...actTabProps(index)}/>)

                            }
                         
                        </Tabs>

                        {
                            outline.acts.map((actObj: any, index: number) => {          
                                    //console.log('actObj: ',  actObj)
                                    return <CustomTabPanel value={act} index={index}>
                                        <StepTabs handleAddScene={() => handleAddScene(index+=1)} steps={actObj.steps} scenes={scenes}/>
                                        {
                                            scenes.length > 0 && (
                                                <Button onClick={() => handleAddScene(index+=1)} sx={{marginLeft: "91%", width: "150px", height: "36px"}} variant='contained'>Add Scene</Button>
                                            )
                                        }
                                    </CustomTabPanel>
                                }
                            )
                        }
                       
                        {/*Act 2 Panel*/}
                        {/*<CustomTabPanel value={act} index={1}>
                            <StepTabs scenes={scenes}/>
                            {
                                scenes.length > 0 && (
                                    <Button onClick={() => handleAddScene(2)} sx={{marginLeft: "91%", width: "150px", height: "36px"}} variant='contained'>Add Scene</Button>
                                )
                            }                        
                        </CustomTabPanel>
                        
                        <CustomTabPanel value={act} index={2}>
                            <StepTabs scenes={scenes}/>
                            {
                                scenes.length > 0 && (
                                    <Button onClick={() => handleAddScene(3)} sx={{marginLeft: "91%", width: "150px", height: "36px"}} variant='contained'>Add Scene</Button>
                                )
                            }                        
                        </CustomTabPanel>*/}
                            
                        
                    </CustomTabPanel>

                    <CustomTabPanel value={bottomValue} index={2}>
                        <Container disableGutters>Screenplay</Container>
                    </CustomTabPanel>
                </AccordionDetails>

            </Accordion>
        </>
       
    )
}