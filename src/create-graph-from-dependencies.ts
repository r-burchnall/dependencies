import {Project} from "./types.ts";

export function createGraphFromDependencies(tree: Record<string, { project: Project; dependencies: Project[] }>) {
    const stringTree: Record<string, string[]> = {}
    for (const [key, value] of Object.entries(tree)) {
        const deps = value.dependencies.map((p) => p.name)
        stringTree[key] = deps
        deps.forEach((dep) => {
            if (!stringTree[dep]) {
                stringTree[dep] = []
            }
        })
    }

    return stringTree;
}