import {Project} from "./types.ts";
import {getDependencyFile} from "./get-dependency-file.ts";
import {Configurations} from "./types.ts";

export async function BuildDependencyTree(configuration: Configurations) {
    const tree: Record<string, { project: Project, dependencies: Project[] }> = {}

    const queue: Project[] = [...configuration.desiredApplications]
    while (queue.length > 0) {
        const current = queue.shift()!
        if (tree[current.name]) {
            continue
        }
        tree[current.name] = {project: current, dependencies: await getDependencyFile(current)}
        queue.push(...tree[current.name].dependencies)
    }

    if (configuration.debug) {
        console.log('Dependency tree: ', tree)
    }

    return tree
}