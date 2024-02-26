import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { sceneCardStyle } from 'styles';
import { Box, CardActions, Container, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tab, Tabs, TextField, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { CustomTabPanel } from '@/shared/CustomTabPanel';
import { sceneStore } from '@/state/sceneState';
import { useTheme } from '@mui/material/styles';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import ls from 'localstorage-slim';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const SceneElementWrapper: React.FC<any> = ({ children }) => {
    return (
        <Container disableGutters sx={{ padding: 1, height: "calc(100% - 7px)", display: "flex", flexDirection: "column", justifyContent: "space-around", width: "100%" }}>
            {children}
        </Container>
    )
}

export const SceneCard: React.FC<any> = ({ number, newScene, versions, locked, act, projectId, step}) => {
    const activeVersion = sceneStore((state) => state.activeVersion)
    const setActiveVersion = sceneStore((state) => state.setActiveVersion)
    //const sceneContent = sceneStore((state) => state.sceneContent)
    //const setSceneContent = sceneStore((state) => state.setSceneContent)
    const newVersion = sceneStore((state) => state.newVersion)
    const setNewVersion = sceneStore((state) =>  state.setNewVersion)
    const versionOptions = sceneStore((state) => state.versionOptions)
    const setVersionOptions = sceneStore((state) => state.setVersionOptions)

    const handleSave = sceneStore((state) => state.handleSave)

    //const [activeVersion, setActiveVersion ] = useState(0)
    const [sceneContent, setSceneContent] = useState<any>({})
    const [ newVersionDisplay, setNewVersionDisplay ] = useState("")
    const [value, setValue] = useState(0);
    const theme = useTheme()

    useEffect(() => {

        console.log('debug scene versionOptions updated: ', versionOptions)
        
        if(newVersion) {
            setTimeout(() => {
                console.log('debug scene set new version display versionOptions: ', versionOptions)
                setNewVersionDisplay(versions.length)

                const localVersions: any = ls.get("version")
                console.log('debug active version localVersions: ', localVersions)

                if(!localVersions) {
                    console.log('debug active version setting localVersions: ', [{sceneNum: number, activeVersion: versions.length}])
                    ls.set("version", [{projectId, sceneNum: number, activeVersion: versions.length}])
                } else {
                    if(localVersions.some((version: any) => version.sceneNum === number && version.projectId === projectId)) {
                        let index = localVersions.findIndex((version: any) => version.sceneNum === number)
                        localVersions[index] = {sceneNum: number, activeVersion: versions.length}
                    } else {
                        localVersions.push({sceneNum: number, activeVersion: versions.length})
                        console.log('debug active version setting localVersions: ', localVersions)
                    }
                    

                    ls.set("version", localVersions)
                }
                
                
            }, 3000)
        }
        
        

    }, [versionOptions.length])

    useEffect(() => {
        if(newVersion) {
            console.log('debug scene update new version: ', newVersion)

            let numVersions = versions.length + 1
            let versionOptions: any = []
            for(let i = 0; i<numVersions; i++) {
                versionOptions.push({version: i + 1})
            }
            setVersionOptions(versionOptions)

        } else {
            console.log('debug scene new version update: ', newVersion)
        }
    }, [newVersion])

    const handleSceneChange = (e: React.ChangeEvent<HTMLInputElement>, updateKey: string) => {
        console.log('debug scene update handleSeneChange running args: ', JSON.stringify({newVersion, projectId, number, newVersionDisplay, step}, null, 2))
        setSceneContent({ ...sceneContent, [updateKey]: e.target.value})
        handleSave(newVersion, newScene, projectId, number, newVersionDisplay, step)

    }

    useEffect(() => {
            console.log(`debug active version ${activeVersion}`)
            let details = versions[activeVersion]
            console.log(`debug active version details for scene ${number}: `, details)
            //const { thesis, antithesis, synthesis, synopsis, sceneHeading, step, act, version } = details
            setSceneContent({
                version: details?.version ? details.version : "",
                thesis: details?.thesis ? details.thesis : "",
                antithesis: details?.antithesis ? details.antithesis : "",
                synthesis: details?.synthesis ? details.synthesis : "",
                synopsis: details?.synopsis ? details.synopsis : "",
                sceneHeading: details?.sceneHeading ? details.sceneHeading : "",
                step: details?.step ? details.step : "",
                act: details?.act ? details.act : ""
            })

    }, [activeVersion, versions])

    const handleVersionChange = (event: SelectChangeEvent) => {
        console.log('debug scene handleChange version: ', event.target.value)
        if(!locked) {
            console.log('set active version: ', event.target.value)
            setActiveVersion(parseInt(event.target.value));
        }
    };

    const handleSceneElChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation()
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (

        <Card sx={sceneCardStyle.card}>

            <CardHeader sx={{ height: "50px", width: "max-content", paddingTop: "8px", paddingBottom: "5px", paddingLeft: 2, paddingRight: 2 }}

                action={

                    <Stack sx={{ width: "412px", alignItems: "center" }} spacing={5} direction="row">
                        
                        <FormControl size='small' sx={{height: "40px", width: "100%" }}>

                            <TextField disabled={locked >= 0 && locked != null} value={sceneContent.sceneHeading ? sceneContent.sceneHeading : "TBD"} variant='standard' size="small" sx={{ "& .MuiInputBase-root": { height: "100%" }, height: "100%", width: "100%" }} />

                        </FormControl>
                        


                        <FormControl size='small' sx={{ height: "40px", minWidth: "120px" }}>
                            <Select
                                disabled={locked != null}
                                variant='standard'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newVersion && versionOptions.length > 0 ? newVersionDisplay.toString() : activeVersion.toString()}
                                onChange={handleVersionChange}
                                sx={{ height: "100%" }}
                            >
                                {
                                    newVersion && versionOptions.length > 0
                                        ?   versionOptions.map((el: any, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={index.toString()}>{"Version " + el.version}</MenuItem>
        
                                                )
                                            })
                                        
                                        :   versions.map((el: any, index: number) => {
                                                return (
                                                    <MenuItem key={index} value={index.toString()}>{"Version " + el.version}</MenuItem>
        
                                                )
                                            })
                                    
                                }

                            </Select>
                        </FormControl>

                        <Tooltip title="Add Version">
                            <IconButton onClick={() => setNewVersion(true)}>
                                <AddCircleOutlineIcon color="secondary"/> 
                            </IconButton>

                        </Tooltip>
                       
                        
                    </Stack>

                }
            />
            <Divider />
            <CardContent sx={{ height: "calc(100% - 50px)", padding: 0 }}>
                <SceneElementWrapper>
                    <Tabs sx={{ "&.MuiTabs-root": { minHeight: "30px" } }} value={value} onChange={handleSceneElChange} aria-label="basic tabs example">
                        <Tab sx={{ "&.MuiTab-root": { maxHeight: "30px", minHeight: "30px" } }} label="Thesis" {...a11yProps(0)} />
                        <Tab sx={{ "&.MuiTab-root": { maxHeight: "30px", minHeight: "30px" } }} label="Antithesis" {...a11yProps(1)} />
                        <Tab sx={{ "&.MuiTab-root": { maxHeight: "30px", minHeight: "30px" } }} label="Synthesis" {...a11yProps(2)} />
                        <Tab sx={{ "&.MuiTab-root": { maxHeight: "30px", minHeight: "30px" } }} label="Synopsis" {...a11yProps(2)} />
                    </Tabs>
                    <CustomTabPanel value={value} index={0}>

                        <TextField
                            disabled={locked >= 0 && locked != null}
                            sx={{ "& .MuiInputBase-input": { minHeight: "115px" }, width: "100%" }}
                            id="outlined-multiline-flexible"
                            value={sceneContent.thesis}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSceneChange(e, "thesis")}
                            multiline
                            maxRows={4}
                        />
                    
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        {
                            locked === null

                                ? <TextField

                                    sx={{ "& .MuiInputBase-input": { minHeight: "115px" }, width: "100%" }}
                                    id="outlined-multiline-flexible"
                                    value={sceneContent.antithesis}
                                    multiline
                                    maxRows={4}
                                />
                                : <Typography>{sceneContent.antithesis}</Typography>

                        }
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        {
                            locked === null

                                ? <TextField

                                    sx={{ "& .MuiInputBase-input": { minHeight: "115px" }, width: "100%" }}
                                    id="outlined-multiline-flexible"
                                    value={sceneContent.synthesis}
                                    multiline
                                    maxRows={4}
                                />
                                : <Typography>{sceneContent.synthesis}</Typography>

                        }
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        {
                            locked === null

                                ? <TextField

                                    sx={{ "& .MuiInputBase-input": { minHeight: "115px" }, width: "100%" }}
                                    id="outlined-multiline-flexible"
                                    value={sceneContent.synopsis}
                                    multiline
                                    maxRows={4}
                                />
                                : <Typography>{sceneContent.synopsis}</Typography>

                        }
                    </CustomTabPanel>
                </SceneElementWrapper>

                <CardActions sx={{ justifyContent: "space-between", height: "20px" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "20px", width: "20px", borderRadius: "50%", backgroundColor: theme.palette.secondary.main }}>
                        <Typography sx={{ fontSize: ".8rem", color: theme.palette.secondary.contrastText }}>{number}</Typography>
                    </Box>

                    <Box>
                        
                        {
                            locked === null
                                ?   <Tooltip title="lock scene">
                                        <IconButton>
                                            <LockOpenIcon color="secondary" />
                                        </IconButton>
                                    
                                    </Tooltip>
                                :   <Tooltip title="unlock scene">
                                        <IconButton>
                                            <LockIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                        }

                    </Box>

                </CardActions>
            </CardContent>
        </Card>
    )
}