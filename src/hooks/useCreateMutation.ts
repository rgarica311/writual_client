import { useEffect } from "react"
import { GqlStatements } from "../enums"

export const useCreateMutation = (gqlStatement, variables: any, mutation, gqlStatementName) => {
    useEffect(() => {
        console.log(`useCreatemutation args ${JSON.stringify({
            gqlStatement,
            variables,
            gqlStatementName
        }, null, 2)}`)
        if(gqlStatement) {
            if(gqlStatementName === GqlStatements.CREATE_PROJECT && variables.title) {
            
                mutation.mutate()
        
            } else if (gqlStatementName === GqlStatements.UPDATE_SCENE) {
                mutation.mutate()
            }
        }
        
    }, [gqlStatement, variables?.title, variables])
    return
}