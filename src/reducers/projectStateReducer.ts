import { request, gql } from "graphql-request";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

enum Action {
    UPDATE_TITLE,
    UPDATE_TYPE,
    UPDATE_GENRE,
    UPDATE_LOGLINE,
    UPDATE_OUTLINE

}


const endpoint = `http://localhost:4000`



export const updateProject = async (action: any, queryClient: any) => {
    switch (action.type) {
        case Action.UPDATE_TITLE: 
            const { title, project_id, user, type  }  = action.payload
            const variables = {
                title,
                project_id,
                user, 
                type
            }
            const UPDATE = gql`
                muation updateProject(project:  { title: $title,  project_id: $project_id, user: $user, type: $type }) {
                    title,
                    project_id,
                    user, 
                    type
                }
            `
            const mutation = useMutation({
                mutationFn: async () => request(endpoint,  UPDATE,  variables),
                onSuccess: () =>  {
                    queryClient.invalidateQueries({ queryKey: ['projects']})
                }
            })

            mutation.mutate()


    }
}