import {Project} from "./types.ts";
import {getDependencyFile} from "./get-dependency-file.ts";
import {resolveDependencyTree} from "./dep-tree.ts";

type Configurations = {
    desiredApplications: Project[]
    deploymentEntryPoint: string
    cloneCommand: string
    debug: boolean
}

const configuration: Configurations = {
    desiredApplications: [
        { name: 'project-b', source: 'https://raw.githubusercontent.com/r-burchnall/dependencies/main/examples/project-b/dependencies.json', version: '1.0.0' },
    ],
    cloneCommand:  `echo "git clone"`,
    deploymentEntryPoint:  `echo "make deploy"`,
    debug: true
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

    const stringTree: Record<string, string[]> = {}
    for (const [key, value] of Object.entries(tree)) {
        const deps = value.map((p) => p.name)
        stringTree[key] = deps
        deps.forEach((dep) => {
            if (!stringTree[dep]) {
                stringTree[dep] = []
            }
        })
    }

    const resolvedTree = resolveDependencyTree(configuration.desiredApplications[0].name, stringTree)
    console.log('resolvedTree', resolvedTree)

    for (const application of resolvedTree) {
        const project = tree[application][0]
        console.log(`git clone ${application}`)
    }
}

main().catch((err) => {
    console.error(err)
})