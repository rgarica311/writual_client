'use client';

import React, { useMemo, useReducer, useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { roboto, openSans, montserrat } from "../../utils/fonts";
import { colors } from '../../utils/colors';
import { Theme, styled, withTheme } from '@mui/material/styles';
import { Button, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Collapse, Paper } from '@mui/material';
import { ThemeProvider} from "@mui/material/styles";
import { getTheme } from '../../themes/themes'
import { request, gql } from "graphql-request";
import { useMutation, useQuery, useQueryClient }  from "@tanstack/react-query";
import { CellWifiSharp, DisplaySettings, TroubleshootRounded } from '@mui/icons-material';
import { CustomTable, CreateProject } from "../../components"
import { columnStateReducer } from "../../reducers"
import { headerCells } from "../../interfaces"
import { useUserStore } from '@/state/userGeneration';

const endpoint = `http://localhost:4000`

const PROJECTS_QUERY = gql`
{
  getProjectData(input: {user: "rory.garcia1@gmail.com"}) {
    id
    title
    genre
    type
    logline
    user
    scenes {
      number
      project_id
      versions {
        act
        antithesis
        synthesis
        thesis
        version
        summary
        step
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

export default function DataTable() {
  const queryClient = useQueryClient()
  const setProjects = useUserStore((state) => state.setProjects)
  const projects = useUserStore((state) => state.projects)

  const { theme, setTheme, appliedTheme } = getTheme()
  const [open, setOpen] = useState(false);
  //const [rows, setRows] = useState([])
  const [addProject, setAddProject]  = useState(false)
  const [ createStatement, setCreateStatement ] = useState<any>()
  const [ createVariables, setCreateVariables ] = useState<any>()

  const columnStatus = React.useMemo(() => ({
    title: true,
    logline: true,
    genre: true,
    type: true,
    progress: true,
    user: true,
    outline: true,
    actions: true
  }), []) 
 
  const filters = React.useMemo(() => ({
    genre:  {
      drama: {selected: true, label: "Drama"},
      comedy: {selected: true, label: "Comedy"},
      crime: { selected: true, label: "Crime"},
      scienceFiction:  {selected: true, label: "Science Fiction"},
    }, 
    type: {
      feature: {selected: true, label: "Feature"},
      short: {selected: true, label: "Short"},
      television: { selected: true, label: "Television"},
    }
    
  }), [])
  
  const [columnState, dispatch] = React.useReducer(columnStateReducer, {columnVisibility:  {...columnStatus},  filterStatus: {...filters} });

  //return request(endpoint, PROJECTS_QUERY);

  const { data, isLoading, error }: any = useQuery({ queryKey: ['projects'], queryFn: async () =>  request(endpoint, PROJECTS_QUERY)})

  useEffect(() => {
    console.log('create proejct data updated: ', data)
    data?.getProjectData.length > 0 && setProjects(data?.getProjectData)
  }, [data])

  useEffect(() => {
    console.log('create project rows updated: ', projects)
    projects.forEach((row: any) =>  {
      row.characters = true
      //row.scenes =  true
      row.treatment = true
    })
  }, [projects])

  console.log('Projects: ', data?.getProjectData)

  const handleHideAll =  ()  => {
    console.log('column state hide all running')
    dispatch({type: "HIDE_ALL"})
  }

  const handleShowAll =  ()  => {
    console.log('column state show all running')
    dispatch({type: "SHOW_ALL"})
  }

  const handleReset =  ()  => {
    dispatch({type: "RESET"})
  }

  const handleColumnUpdate = (dataIndex: string) => {
    console.log('columnState handleColumnUpdate running for: ', dataIndex)
    const statusFilters = Object.keys(filters)

    if(statusFilters.includes(dataIndex))  {
      console.log('columnState status filter: ', dataIndex)
      dispatch({type: "STATUS_FILTER", filter: dataIndex})
    } else {
      dispatch({type: "TOGGLE_COLUMN", dataIndex})
    }
    
  }

  const mutation = useMutation({
    mutationFn: async () => {
      console.log('create proejct useMutation variables: ', createVariables)
      await request(endpoint, createStatement,  createVariables)
    },
    onSuccess: () =>  {
        console.log('create proejct Update Success')
        queryClient.invalidateQueries({ queryKey: ['projects']})
    },
    onError: (error: any) => {
        console.log('create proejct mutation  error', JSON.stringify(error,  null, 2))
    },
    onMutate: () => {
        console.log('create proejct useMutation mutating  variables: ', createVariables)

    }
  })

  useEffect(()  => {
    if(createVariables?.title && createStatement) mutation.mutate()
  }, [createStatement, createVariables])

  const handleAddProject = (formValues: any) => {
    console.log('create project handleAddProject formValues: ', formValues)
    formValues.user = "rory.garcia1@gmail.com"
    setCreateVariables(formValues)

    const CREATE_PROJECT = gql`
      mutation CreateProject($title: String!, $type: ProjectType!, $user: String!, $logline: String, $genre: String, $outline: OutlineInput) {
        createProject(input: {title: $title, type: $type, user: $user, logline: $logline, genre: $genre, outline: $outline}) {
          id,
          title
        }
      }
    `

    setCreateStatement(CREATE_PROJECT)
  }

  return (
      <>
      {
        
          <CustomTable 
            setAddProject={setAddProject}
            handleHideAll={handleHideAll}
            handleShowAll={handleShowAll}
            handleReset={handleReset}
            columnState={columnState}
            columnStateUpdate={handleColumnUpdate}
            defaultSortColumn="title"
            //fetchHook={useBatchPrint}
            label="Projects" 
            headerCells={headerCells}
            rows={projects}
            headerButtonText="Share"
            headerButtonAriaLabel="share-project(s)"
          />
        
      } 
      {
        addProject && (
          <CreateProject handleAddProject={handleAddProject} setAddProject={setAddProject}  />
        )
      }

      </>
      
  );
}
