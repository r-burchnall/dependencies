import {Project} from "./types.ts";
import {getDependencyFile} from "./get-dependency-file.ts";

type Configurations = {
    desiredApplications: Project[]
}

const configuration: Configurations = {
    desiredApplications: [
        { name: 'project-b', source: 'https://raw.githubusercontent.com/r-burchnall/dependencies/blob/main/examples/project-b/dependencies.json', version: '1.0.0' },
    ]
}

async function buildDependencyTree(configuration: Configurations) {
    const tree: Record<string, Project[]> = {}

    const desiredApplications = configuration.desiredApplications
    for (const application of desiredApplications) {
        tree[application.name] = await getDependencyFile(application)
    }

    return tree
}

async function main() {
    const tree: Record<string, Project[]> = await buildDependencyTree(configuration)
    console.log('Tree response', {tree})
}

main().catch((err) => {
    console.error(err)
})