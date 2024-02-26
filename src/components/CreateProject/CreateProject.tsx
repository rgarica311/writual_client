'use client'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useUserStore } from '@/state/userGeneration';
import { ProjectType } from '@/enums/ProjectEnums'
import { CreateProjectProps } from "@/interfaces/project";


const InputWrapper: React.FC<any> = ({ children }) => {
    return (
      <Container disableGutters sx={{ display: "flex", justifyContent: "space-between", height: "56px" }}>
        {children}
      </Container>
    )
}

export const CreateProject: React.FC<CreateProjectProps> = ({setAddProject, handleAddProject}) =>  {
  const outlines = useUserStore((state) => state.outlines)
  const theme = useTheme();
  const [formValues, setFormValues] = useState<any>({})

  useEffect(() => {
    console.log('create project formValues: ', formValues)
  }, [formValues])

  const updateForm = useCallback((e: React.ChangeEvent<HTMLInputElement>, index) => {
    console.log(`create proejct updateForm e:  `, e)
    console.log(`create proejct oldValues: ${JSON.stringify(formValues, null, 2)}`)
    console.log(`create proejct updateForm index: `, index)
    const values = formValues
    console.log(`create proejct values after creating: ${JSON.stringify(values, null, 2)}`)

    if (index === 'lowerDate' || index === "upperDate") {
      console.log(`create proejct index: `, index)
      console.log(`create proejct index check values: ${JSON.stringify(values, null, 2)}`)
      console.log(`create proejct values.hasOwnProperty('lowerDate'): ${values.hasOwnProperty('lowerDate')}`)
      console.log(`create proejct values.lowerDate ${values.lowerDate}`)
      values[index] = e
      console.log('create proejct setting upperDate values: ', values)
      setFormValues(values)
      return
    } else if (index === 'days') {
      values[index] = e.target.checked ? '90' : '30'
    } else {
      values[index] = e.target.value
    }
    console.log(`create proejct values: ${JSON.stringify(values, null, 2)}`)
    setFormValues(values)
  }, [formValues])

  return (
    <Dialog fullWidth={true} open={true} PaperProps={{ style: { minWidth: "900px", maxHeight: "500px", backgroundColor: theme.palette.background.default} }}>
        <DialogTitle  sx={{paddingLeft: 5, paddingTop: 3}}>CREATE PROJECT</DialogTitle>
        <DialogContent sx={{marginTop:  "5px", display:"flex", flexWrap: "wrap", padding: 5, paddingBottom: 2, height: "662px", width: "100%"}}>
            
            <InputWrapper>
                <TextField required label="Title" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm(e, "title")} placeholder="Title" variant="standard" sx={{width: "400px", height: "56px"}}></TextField>
                <TextField  label="Genre" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm(e, "genre")} placeholder="Ex: Drama, Comedy, etc" variant="standard" sx={{width: "400px", height: "56px"}}></TextField>
            </InputWrapper>

            <InputWrapper>
              <TextField label="Logline"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm(e, "logline")} placeholder="Logline" variant="standard" sx={{width: "400px", height: "56px"}}></TextField>
              <TextField  label="Budget" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm(e, "budget")} placeholder="Budget" variant="standard" sx={{width: "400px", height: "56px"}}></TextField>
            </InputWrapper>

            <InputWrapper>
                <TextField label="Similar" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm(e, "similar_projects")} placeholder="Similar Movies" variant="standard" sx={{width: "400px", height: "56px"}}></TextField>
                <TextField  label="Time Period" onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateForm(e, "time_period")} placeholder="Time Period" variant="standard" sx={{width: "400px", height: "56px"}}></TextField>
            </InputWrapper>


            <InputWrapper>
              <FormControl sx={{width: "400px", height: "56px"}}>
                  <InputLabel sx={{color: theme.palette.text.primary}}>Project Type</InputLabel>
                  <Select required variant="standard" onChange={(e: any) => updateForm(e, "type")} sx={{flexGrow: 1, height: "56px"}} label="Type">
                    <MenuItem value={ProjectType.Feature}>Feature Film</MenuItem>
                    <MenuItem value={ProjectType.Television}>Television</MenuItem>
                    <MenuItem value={ProjectType.Short}>Short Film</MenuItem>
                    
                  </Select>
              </FormControl>

              <FormControl sx={{width: "400px", height: "56px"}}>
                <InputLabel sx={{color: theme.palette.text.primary}}>Outline</InputLabel>
                <Select variant="standard" onChange={(e: any) => updateForm(e, "outline")} sx={{flexGrow: 1, height: "56px"}} label="Outline">
                  {
                    outlines.length > 0 
                      ? outlines.map((name: string, index: number) => {
                          return <MenuItem key={index} value={name}>{name}</MenuItem>
                        })
                  
                      : <Button sx={{width: "100%", height: "54px", fontSize: "1.4rem",  letterSpacing: ".2em"}}>Create Outline</Button>
                  }
                </Select>
              </FormControl>
            </InputWrapper> 
            
        </DialogContent>
        <DialogActions sx={{paddingBottom: 3, paddingRight: 5}}>
            <Button onClick={() => { setAddProject(false) }} variant="contained" color='secondary'  sx={{ width: "94px", height:"36px", paddingLeft: "6px", paddingTop: "16px", paddingRight: "6px", paddingBottom: "16px"}}>CANCEL</Button>
            <Button onClick={() => {handleAddProject(formValues); setAddProject(false)}} variant="contained" color='primary' sx={{width: "138px", height:"36px", paddingLeft: "6px", paddingTop: "16px", paddingRight: "6px", paddingBottom: "16px"}}>SUBMIT</Button>
        </DialogActions>
    </Dialog>

  )
}