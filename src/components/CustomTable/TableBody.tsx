'use client';

import React, { useCallback, useEffect, useReducer, useState } from "react";
import  { updateProject } from "../../reducers"
import { TableBody, TableRow, TableCell, Container, TextField, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, Box, Button, IconButton, Popover, Tooltip, Typography } from "@mui/material"
import { tableBodyStyle } from "../../styles";
import { useTheme } from '@mui/material/styles';
import {  Progress } from "./Progress"
import MoreVertIcon  from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import { request, gql } from "graphql-request";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import  {  useDebounce }  from "use-debounce"
import debounce from "debounce";

interface TableBodyProps {
    visibleRows: any
    headerCells: any
    edit: any
    currentProject: any
    isSelected: any
    project: any
    handleUpdateProject: Function
    handleRecordClick: Function
    setCurrentProject: Function
    //handleEditProject: Function
}

enum Action {
    UPDATE_TITLE,
    UPDATE_TYPE,
    UPDATE_GENRE,
    UPDATE_LOGLINE,
    UPDATE_OUTLINE
}

export const CustomTableBody: React.FC<TableBodyProps> = (props: TableBodyProps) => {
    const { 
        visibleRows, 
        headerCells, 
        isSelected, 
        project, 
        handleUpdateProject, 
        handleRecordClick,
    } = props
    //const [ projectEditState, updateProject ] = useReducer(projectStateReducer, visibleRows)
    const [ currentProject, setCurrentProject ] = useState("")
    const [ edit, setEdit ] = useState(false)
    const theme = useTheme()
    const headerCellsLength = headerCells.length
    const widthPercentage = Math.ceil(100 / headerCellsLength)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const openActions = Boolean(anchorEl);
    const popoverId = openActions ? 'simple-popover' : undefined;

    const queryClient = useQueryClient()
    const endpoint = `http://localhost:4000`
    const [ updateStatement, setUpdateStatement ] = useState<any>()
    const [ variables, setVariables ]  = useState<any>({})
    const [ deleteVariables, setDeleteVariables ] = useState<any>({})
    const [ title, setTitle ] = useState<any>()


    const updateProject = async (action: any) => {
        switch (action.type) {
            case Action.UPDATE_TITLE: 
                const { title, project_id, user, type  }  = action.payload
                setVariables({
                    title,
                    project_id: project_id,
                    user, 
                    type
                })
                const UPDATE = gql`
                mutation UpdateProject($title: String!, $project_id: String!, $user: String!, $type: ProjectType!){
                    updateProject(project:  { title: $title,  project_id: $project_id, user: $user, type: $type }) {
                        title,
                        id,
                        user, 
                        type
                    }
                }    
                `
                setUpdateStatement(UPDATE)
                
        }
    }

    const deleteStatement = gql`
        mutation DeleteProject($deleteProjectId: String!){
            deleteProject(id: $deleteProjectId)
        }  
    `

    const deleteMutation = useMutation({
        mutationFn: async () => {
            console.log('Edit useMutation variables: ', variables)
            await request(endpoint,  deleteStatement,  deleteVariables)
        },
        onSuccess: () =>  {
            console.log('Edit Update Success')
            queryClient.invalidateQueries({ queryKey: ['projects']})
        },
        onError: (error: any) => {
            console.log('Edit mutation  error', JSON.stringify(error,  null, 2))
        },
        onMutate: () => {
            console.log('Edit useMutation mutating  variables: ', variables)

        }
    })

    useEffect(()  => {
        if(deleteVariables.deleteProjectId) deleteMutation.mutate()
    }, [deleteVariables.deleteProjectId])

    const handleDeleteProject = (deleteProjectId: string) => {
        setDeleteVariables({deleteProjectId})
        handleCloseActions()
    }

    useEffect(()  => {
        if(variables.title && updateStatement) {
            mutation.mutate()
            setEdit(false)
        }
    },  [variables.title,  updateStatement ])

 

    const mutation = useMutation({
        mutationFn: async () => {
            console.log('Edit useMutation variables: ', variables)
            await request(endpoint,  updateStatement,  variables)
        },
        onSuccess: () =>  {
            console.log('Edit Update Success')
            queryClient.invalidateQueries({ queryKey: ['projects']})
        },
        onError: (error: any) => {
            console.log('Edit mutation  error', JSON.stringify(error,  null, 2))
        },
        onMutate: () => {
            console.log('Edit useMutation mutating  variables: ', variables)

        }
    })


   

    const handleEditProject = (e: any, id: string, title: string) => {
        //console.log(`debug edit handleEditProject: ${id} title: ${title}`)
        handleCloseActions()
        setEdit(true)
    }

    const getGenreChipColor = (genre: string) => {
        let genreVar = genre.replace(" ", "").toLocaleLowerCase()

        if(theme.palette[genreVar]) {
            return theme.palette[genreVar].main
        } else {
            return 'grey'
        }
    }

    const getGenreChipContrastText = (genre: string) => {
        let genreVar = genre.replace(" ", "").toLocaleLowerCase()
        if(theme.palette[genre.toLowerCase()]) {
            return theme.palette[genreVar].contrastText
        } else {
            return 'white'
        }
    }

    const handleOpenActions = (e: any) => {
        e.stopPropagation()
        setAnchorEl(e.currentTarget);
    }

    const handleCloseActions = ()  => {
        setAnchorEl(null)
    }

    return (
        
    <TableBody  sx={{overflowY: "scroll", minWidth: "1760px"}}>
    {
        visibleRows?.map((row: any, index: number) => {
            const isItemSelected = isSelected(row.id); 
            return (   
                <TableRow  selected={isItemSelected} key={`tableRow-${row.id}`} sx={tableBodyStyle.row}>
                        {
                            headerCells.map((cell: any) => {
                                return <TableCell sx={{...tableBodyStyle.cell, maxWidth: `${widthPercentage}%`,}} key={cell.dataIndex}>
                                            <Container disableGutters sx={tableBodyStyle.container}>
                                             
                                                {
                                                    cell.dataIndex === "title"  && (
                                                        
                                                            edit && currentProject === row.id

                                                                ? <TextField
                                                                variant="standard"
                                                                id="outlined-controlled"
                                                                label={row[cell.dataIndex]}
                                                                //value={projectEditState[index].title}
                                                                onChange={debounce((e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    updateProject({type: Action.UPDATE_TITLE, payload: { title: e.target.value, project_id: row.id, user: row.user, type: row.type }})
                                                                }, 3000)}
                                                              />
                                                                : <Typography onClick={(e) => handleRecordClick(e, row.id)}  sx={tableBodyStyle.text} fontWeight={cell.dataIndex === "title" ? "bold" : "light"}>
                                                                    {row[cell.dataIndex]}
                                                                </Typography>

                                                        
                                                    )

                                                }

                                                {
                                                    cell.dataIndex === "logline" && (
                                                        edit && currentProject === row.id

                                                                ? <TextField
                                                                variant="standard"
                                                                id="outlined-controlled"
                                                                label={row[cell.dataIndex]}
                                                                //value={projectEditState[index].logline}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    //updateProject({type: Action.UPDATE_LOGLINE, payload: { loogline: e.target.value, id: row.id}})
                                                                }}
                                                              />
                                                              : <Tooltip title={<Typography>{   row[cell.dataIndex]}</Typography>}>
                                                                    <Typography sx={tableBodyStyle.text}>
                                                                        {   row[cell.dataIndex]}
                                                                    </Typography>
                                                                </Tooltip>
                                                    )
                                                }

                                                {

                                                    cell.dataIndex === "genre"  && (
                                                        edit && currentProject  === row.id
                                                            ?   <TextField
                                                                    variant="standard"
                                                                    id="outlined-controlled"
                                                                    label={row[cell.dataIndex]}
                                                                    //value={projectEditState[index].genre}
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        //updateProject({type: Action.UPDATE_GENRE, payload: { value: e.target.value, id: row.id}})
                                                                }}
                                                                />
                                                            : <Box sx={
                                                                {
                                                                    ...tableBodyStyle.genreChip, 
                                                                    backgroundColor:  getGenreChipColor(row[cell.dataIndex]),
                                                                    color:  getGenreChipContrastText(row[cell.dataIndex])

                                                                    
                                                                }
                                                            }>
                                                            <Typography>
                                                                {row[cell.dataIndex]}
                                                            </Typography>
                                                        </Box>
                                                        
                                                        
                                                    )

                                                }
                                                
                                                    
                                                {
                                                    cell.dataIndex === "type"  &&   (
                                                        edit && currentProject  === row.id
                                                            ?  <FormControl sx={{width: "100%"}}>
                                                                    <InputLabel color="secondary">Project Type</InputLabel>

                                                                    <Select /*onChange={(e: SelectChangeEvent) => {updateProject({type: Action.UPDATE_TYPE, payload: { value: e.target.value, id: row.id}})}}*/ color="secondary" variant="outlined" sx={{minWidth: "100%", height: "100%"}} label="Project Type">
                                                                        <MenuItem value={"Feature Filme"}>Feature Film</MenuItem>
                                                                        <MenuItem value={"Television"}>Television</MenuItem>
                                                                        <MenuItem value={"Short Film"}>Short Film</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            :   <Typography sx={tableBodyStyle.text}>
                                                                    {row[cell.dataIndex]}
                                                                </Typography>
                                                            
                                                    )
                                                }

                                                {
                                                    cell.dataIndex === "progress"  && (
                                                        <Progress characters={row.characters} scenes={row.scenes}  treatment={row.treatment}/>
                                                    )
                                                }
                                                
                                                
                                                
                                                {
                                                    cell.dataIndex === "user" && ( 
                                                        <Typography sx={tableBodyStyle.text}>
                                                            {row[cell.dataIndex]}
                                                        </Typography>
                                                    )

                                                }

                                                {
                                                    cell.dataIndex === "outline"  &&   (
                                                        console.log('outline:  ', row[cell.dataIndex] === null ),
                                                        (edit && currentProject === row.id ) || row[cell.dataIndex] === null
                                                            ?   <FormControl sx={{width: "100%"}}>
                                                                    <InputLabel color="secondary">Pick Outline Format</InputLabel>

                                                                    <Select placeholder="Choose Outline"  /*onChange={(e: SelectChangeEvent) => {updateProject({type: Action.UPDATE_OUTLINE, payload: { value: e.target.value, id: row.id}})}}*/ color="secondary" variant="outlined" sx={{minWidth: "100%", height: "100%"}} label="Outline">
                                                                        <MenuItem value={"Heroe's Journey"}>Heroe's Journey</MenuItem>
                                                                        <MenuItem value={"Save The Cat"}>Save The Cat</MenuItem>
                                                                        <MenuItem value={"Anatomy of Story"}>Anatomy of Story</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            :   <Typography sx={tableBodyStyle.text}> 
                                                                    {row[cell.dataIndex]}
                                                                </Typography>
                                                            
                                                    )
                                                }
                                                
                                               
                                                {
                                                    cell.dataIndex === "actions" && (
                                                        <>
                                                            <IconButton sx={{padding: 0}} onClick={(e: any) => {
                                                                e.stopPropagation();
                                                                setCurrentProject(row.id)
                                                                handleOpenActions(e)
                                                            }
                                                            }>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                
                                                            <Popover  slotProps={{paper: {sx: {display: 'flex', flexDirection: "column"}}}} 
                                                                    anchorOrigin={{
                                                                        vertical: 'bottom',
                                                                        horizontal: 'center',
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'center',
                                                                    }} id={popoverId} open={openActions} anchorEl={anchorEl}>                                                                                      
                                                                     
                                                                     <Button sx={{padding: "10px", height: "50px"}} startIcon={<ShareIcon/>}>
                                                                        Share Project
                                                                    </Button>

                                                                     <Button onClick={(e: any) => {
                                                                            handleEditProject(e,  row.id, row.title)
                                                                        }
                                                                    } sx={{padding: "10px", height: "50px"}} startIcon={<EditIcon/>}>
                                                                        Edit Project
                                                                     </Button>

                                                                     <Button  onClick={(e: any) => {handleDeleteProject(row.id)}} sx={{padding: "10px", height: "50px"}} startIcon={<DeleteIcon/>}>
                                                                        Delete Project
                                                                     </Button>

                                                                       
                                                            </Popover>
                                                         </>
                                                       
                                                    )
                                                }
                                               
                                            

                
                                            </Container>
                                            
                                        </TableCell>
                            })
                        }
                    </TableRow>
                           
            )

        })
    }
</TableBody>
    )
}