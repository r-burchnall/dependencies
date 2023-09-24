import {Project} from "./types.ts";

type Configurations = {
    desiredApplications: Project[]
}

const configuration = {
    desiredApplications: [
        { name: 'project-b', source: 'https://raw.githubusercontent.com/r-burchnall/dependencies/blob/main/examples/project-b/dependencies.json', version: '1.0.0' },
    ]
}
