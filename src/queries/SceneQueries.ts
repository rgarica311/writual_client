 import { gql } from "graphql-request";
//import { Scene } from "../interfaces";

export const CREATE_SCENE = gql`
    mutation CreateScene($scene: Scene) {
        createScene(scene: {
            act: $act,
            projectId: $projectId, 
            newVersion: $newVersion,
            number: $number
            activeVersion: $activeVersion
            versions: [
                {
                    sceneHeading: $sceneHeading,
                    act: $act,
                    step: $step
                    thesis: $thesis,
                    antithesis: $antithesis,
                    synthesis: $synthesis,
                    synopsis: $synopsis,
                    version: $version

                }
            ]
        }) 
    }
`

export const UPDATE_SCENE = gql`
    mutation CreateScene($act: Int, $projectId: String!, $number: Int, $versions: [SceneContentInput]) {
        createScene(scene: { act: $act, projectId: $projectId, number: $number, versions: $versions }) {
            projectId
        }
    }
`