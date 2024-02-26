'use client';

import React, { useState, useEffect } from 'react';
import { request } from "graphql-request";
import { useQuery, useQueryClient }  from "@tanstack/react-query";
import { CustomTable, CreateProject } from "../../components"
import { headerCells } from "../../interfaces"
import { useUserStore } from '@/state/userGeneration';
import { PROJECTS_QUERY, CREATE_PROJECT } from '@/queries/ProjectQueries';
import { createMutation } from '@/helpers/createMutation';
import { useCreateMutation } from 'hooks';
import { GqlStatements } from "@/enums/GqlStatements"
import { useProjectTableState } from '@/state/userGeneration';
import { Mutation } from "@/interfaces/scene"
import { sceneStore } from '@/state/sceneState';

const endpoint = `http://localhost:4000`

export default function DataTable() {
  const queryClient = useQueryClient()
  const createStatement = useProjectTableState((state) => state.createStatement)
  const setCreateStatement = useProjectTableState((state) => state.setCreateStatement)
  const setProjects = useUserStore((state) => state.setProjects)
  const projects = useUserStore((state) => state.projects)
  const [addProject, setAddProject]  = useState(false)
  const [ createVariables, setCreateVariables ] = useState<any>()
  const setActiveVersion = sceneStore((state) => state.setActiveVersion)
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
  
  const { data, isLoading, error }: any = useQuery({ queryKey: ['projects'], queryFn: async () =>  request(endpoint, PROJECTS_QUERY)})

  useEffect(() => {
    console.log('debug scene projects data updated: ', data)
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

  const addProjectMutationArgs: Mutation = {
    createStatement,
    createVariables,
    invalidateQueriesArray: ['projects'],
    stateResetters: {
      setCreateStatement
    }
  }

  const mutation = createMutation(addProjectMutationArgs)

  useCreateMutation(createStatement, createVariables, mutation, GqlStatements.CREATE_PROJECT)

  const handleAddProject = (formValues: any) => {
    console.log('create project handleAddProject formValues: ', formValues)
    formValues.user = "rory.garcia1@gmail.com"
    setCreateVariables(formValues)
    setCreateStatement(CREATE_PROJECT)
  }

  return (
      <>
      {
        
        <CustomTable 
          setAddProject={setAddProject}
          defaultSortColumn="title"
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
