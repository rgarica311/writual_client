export enum ProjectType {
    Feature,
    Short,
    Television,
}

export interface Project {
    id: { type: String },
    created_date:  { type: String  },
    modified_date: { type: String },
    revision:  { type: Number },
    user: { type: String },
    sharedWith: { type: [String] },
    type: { type: String, enum: ProjectType },
    genre: { type: String },
    title: { type: String },
    logline:{ type:  String },
    budget: { type: Number },
    time_period: {type: String},
    similar_projects: [String]
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export type Projects = Project[] | []
