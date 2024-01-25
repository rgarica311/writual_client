'use client';

import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Checkbox, Container, Divider, IconButton, Link, MenuItem, MenuList, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { request, gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import  { CharacterCard } from '../../../components/CharacterCard'
import { SceneCard } from '@/components/SceneCard';

const endpoint = `http://localhost:4000`

const searchStyle = {
    height: "56px",
    width: "400px"
}

const tableTopStyle = {
    backgroundColor: "white",
    maxWidth: "100%",
    height: "88px",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 2
}

const iconContainer = {
    height: "40px",
    width: "40px",
    padding: "8px"
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

const CustomTabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

export default function Project({ params }) {
    const [expandedTop, setExpandedTop] = useState(true)
    const [expandedBottom, setExpandedBottom] = useState(true)
    const [characters, setCharacters] = useState([])
    const [scenes, setScenes] = useState([])
    const [value, setValue] = useState(0);
    const [bottomValue, setBottomValue] = useState(0);
    const [title, setTitle] = useState("")

    const handleBottomChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setBottomValue(newValue);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setValue(newValue);
    };
    console.log('Project params: ', params.id)

    const id = params.id
    const PROJECT_QUERY = gql`
            query GetProjectData($input: ProjectFilters) {
                getProjectData(input: $input) {
                    id
                    title
                    genre
                    type
                    user
                    characters {
                        details {
                        age
                        bio
                        gender
                        need
                        version
                        want
                    }
                    name
                    }
                    scenes {
                        number
                        versions {
                            act
                            antithesis
                            step
                            summary
                            synthesis
                            thesis
                            version
                        }
                    }
                    outline {
                    format {
                        name
                    }
                    }
                }
            }
        `;

    const variables = {
        input: {
            user: "rory.garcia1@gmail.com", 
            id
        }
        
    }
    
    const { data, isLoading, error }: any = useQuery({queryKey: ['proojects'], queryFn: async () => request(endpoint, PROJECT_QUERY, variables)});


    useEffect(() => {
        console.log('data isLoading: ', isLoading)
        if(!isLoading) {
            if(data.getProjectData.length > 0) {
                console.log('data: ', data.getProjectData)
                let projectData = data.getProjectData[0]
                setCharacters(projectData.characters)
                setScenes(projectData.scenes)
                setTitle(projectData.title)
            }
        }
       
    }, [isLoading])

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

    const tableTopButtons = {
        display: "flex",
        flexDirection: "row",
        height: "56px",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 1,
        margin:   0
        //backgroundColor: theme.palette.background.paper
    }

    const sceneContainer = {
        margin:  0,
        minWidth: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap:  "wrap"
    }

    return (
        <>
            <Container  disableGutters sx={tableTopButtons}>
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
                                : <Typography>No Characters</Typography>

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

            <Accordion disableGutters={true} expanded={expandedBottom} onChange={() => toggleAccordionBottom()} >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{display: "flex", alignItems: "center", minWidth: "100%"}}>
                    <Tabs value={bottomValue} onChange={handleBottomChange} aria-label="basic tabs example">
                        <Tab label="Treatment" {...a11yProps(0)} />
                        <Tab label="Scenes" {...a11yProps(1)} />
                        <Tab label="Srceenplay" {...a11yProps(2)} />
                    </Tabs>
                        
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "13px", minWidth: "100%", height: "100%"}}>
                    <CustomTabPanel value={bottomValue} index={0}>
                        <Container disableGutters sx={{margin: 0, padding: 1}}>Treatment</Container>
                    </CustomTabPanel>
                    <CustomTabPanel value={bottomValue} index={1}>
                        <Container disableGutters sx={sceneContainer}>
                            <SceneCard/>
                            <SceneCard/>
                            <SceneCard/>
                            <SceneCard/>
                            <SceneCard/>
                            <SceneCard/>
                        </Container>
                    </CustomTabPanel>
                    <CustomTabPanel value={bottomValue} index={2}>
                        <Container disableGutters>Screenplay</Container>
                    </CustomTabPanel>
                </AccordionDetails>

            </Accordion>
        </>
       
    )
}