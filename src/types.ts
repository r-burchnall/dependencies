export type Project = {
    name: string
    version: string
    source: string
}

export type Configurations = {
    desiredApplications: Project[]
    deploymentCommand: string
    cloneCommand: string
    debug: boolean
    githubOrganisation: string
}