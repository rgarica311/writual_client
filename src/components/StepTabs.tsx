import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Version, Scene} from '../interfaces'
import { SceneCard } from '@/components/SceneCard';
import { Badge, Button } from '@mui/material';
import { VerticalTabPanel } from './shared';
import { sceneStore } from '../state';
import { useEffect } from 'react';
import ls from 'localstorage-slim';

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface StepTabs {
    scenes: Scene[]
    handleAddScene: Function
}

export const StepTabs: any = ({scenes, handleAddScene, steps}) => {
  const [step, setStep] = React.useState<number>(0)
  const activeVersion = sceneStore((state) => state.activeVersion)
  const setActiveVersion = sceneStore((state) => state.setActiveVersion)
  const setActiveStep = sceneStore((state) => state.setActiveStep)

  console.log('debug activeVersion scenes: ', scenes)
  console.log('debug activeVersion: ', activeVersion)


  
  const handleStepChange = (event: React.SyntheticEvent, newValue: number) => {
    event.stopPropagation()
    let step = steps[newValue].stepName
    console.log('active step: ', step)
    setActiveStep(step)
    setStep(newValue);
};

  //const testSteps = ["Ordinary World", "Call To Adventure", "Refusal", "Meeting the Mentor", "Threshold"]

  interface StepObj {
    stepName: string
    stepDetails: string
    stepAct: number
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'background.paper',
        display: 'flex',
        height: "100%",
      }}
    >
    <Tabs TabIndicatorProps={{style: {backgroundColor: "white"}}} variant='fullWidth' orientation="vertical" value={step} onChange={handleStepChange} aria-label="act tabs">                       
        {
            steps.map((step: any, index: number) => {
                return <Tab label={step.stepName} {...a11yProps(index)}/>
            })
        }
    </Tabs>
    
    {
        steps.map((stepObj: StepObj, index: number) => {
          let stepName = stepObj.stepName
            return  <VerticalTabPanel key={index} value={step} index={index}>
                        {    
                                    
                            scenes.length > 0 
                                ? scenes.map((scene: any, index: number) => {
                                    console.log('scenes Act 1 scene: ', scene)
                                    setActiveVersion(scene.activeVersion)
                                    //console.log('Scenes Act 1 scene.act: ', scene.act)
                                    //console.log(`verticalTable index ${index} step: ${step} activeVersion ${activeVersion} stepObj: `, stepObj)

                                    return <SceneCard
                                            key={index}
                                            step={stepName}
                                            projectId={scene.projectId}
                                            act={scene.act}
                                            newScene={scene.newScene}
                                            number={scene.number}
                                            locked={scene.lockedVersion}
                                            versions={scene.versions}/>

                                })
                                : <Button onClick={handleAddScene}  sx={{width: "300px", height: "50px"}} variant='contained'>Add Scene</Button>
                            
                        }
                    </VerticalTabPanel>
        })

    }

    </Box>
  );
}
