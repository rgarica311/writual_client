import { gql } from "graphql-request";

export const PROJECTS_QUERY = gql`
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
      projectId
      lockedVersion
      activeVersion
      versions {
        act
        antithesis
        synthesis
        thesis
        version
        synopsis
        sceneHeading
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

export const PROJECT_QUERY = gql`
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
            act
            lockedVersion
            activeVersion
            projectId
            versions {
                act
                antithesis
                step
                synopsis
                synthesis
                thesis
                version
                sceneHeading
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

export const CREATE_PROJECT = gql`
mutation CreateProject($title: String!, $type: ProjectType!, $user: String!, $logline: String, $genre: String, $outline: OutlineInput) {
  createProject(input: {title: $title, type: $type, user: $user, logline: $logline, genre: $genre, outline: $outline}) {
    id,
    title
  }
}
`

export const DELETE_PROJECT = gql`
mutation DeleteProject($deleteProjectId: String!){
    deleteProject(id: $deleteProjectId)
}  
`

export const UPDATE_PROJECT = gql`
mutation UpdateProject($title: String!, $logline: String!, $projectId: String!, $user: String!, $type: ProjectType!){
    updateProject(project:  { title: $title, logline: $logline, projectId: $projectId, user: $user, type: $type }) {
        title,
        id,
        user, 
        type
    }
}    
`