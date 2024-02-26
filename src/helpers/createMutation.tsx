import { useMutation, useQueryClient }  from "@tanstack/react-query";
import { request } from "graphql-request";
import { Mutation } from "@/interfaces/scene"
import { sceneStore } from '@/state/sceneState';

const endpoint = `http://localhost:4000`


export const createMutation = (updateMutationArgs: Mutation) => {
    //console.log(`debug scene create mutations updateMutationArgs: `, updateMutationArgs)
    const { createStatement, createVariables, invalidateQueriesArray, stateResetters } = updateMutationArgs
    const queryClient = useQueryClient()
    //const setVersionOptions = sceneStore((state) => state.setVersionOptions)

    return useMutation({
        mutationFn: async () => {
          console.log('create proejct useMutation variables: ', createVariables)
          await request(endpoint, createStatement,  createVariables)
        
        },
        onSuccess: () =>  {
            console.log('debug scene Update Success')
            console.log('debug scene invalidateQueriesArray: ', invalidateQueriesArray)
           
            console.log('debug scene invalidate query')
            queryClient.invalidateQueries({ queryKey: invalidateQueriesArray})
            queryClient.removeQueries({ queryKey: invalidateQueriesArray })
            queryClient.resetQueries({ queryKey: invalidateQueriesArray })
            
            console.log('debug scene state resetters: ', stateResetters)
            
            if(stateResetters) {
                console.log(`debug scene reset state`)

                stateResetters.setCreateStatement("")
                stateResetters.setCreateVariables({})
                stateResetters.setVersionOptions?.([])
                stateResetters.setNewVersion?.(false)

            }
            

        },
        onError: (error: any) => {
            console.log('create proejct mutation  error', JSON.stringify(error,  null, 2))
        },
        onMutate: () => {
            console.log('create proejct useMutation mutating  variables: ', createVariables)
        }
      })
}