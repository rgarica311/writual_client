export interface Version {
    version: number;
    act: number;
    step: string;
    synopsis: string;
    thesis: string;
    antithesis: string;
    synthesis: string;
    sceneHeading: string;

}

export interface Scene  {
    act: number;
    number?: number;
    lockedVersion?: number | undefined;
    activeVersion?: number;
    newScene?: boolean;
    newVersion?: boolean;
    projectId: string;
    versions: Version[];
}

export interface Mutation {
    createStatement: string;
    createVariables: {[key: string]: string};
    invalidateQueriesArray: string[];
    stateResetters?: {[key: string]: Function};
}