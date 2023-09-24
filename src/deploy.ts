import {Configurations} from "./types.ts";
import {BuildDependencyTree} from "./build-dependency-tree.ts";
import {createGraphFromDependencies} from "./create-graph-from-dependencies.ts";
import {resolveDependencyTree} from "./dep-tree.ts";
import {ExecuteFetchAndDeploy} from "./execute-fetch-and-deploy.ts";

export async function Deploy(configuration: Configurations) {
    const tree = await BuildDependencyTree(configuration)
    const stringTree = createGraphFromDependencies(tree);

    const resolvedTree = resolveDependencyTree(configuration.desiredApplications[0].name, stringTree)

    if(configuration.debug) {
        console.log('Resolved dependency tree order: ', resolvedTree)
    }

    ExecuteFetchAndDeploy(configuration, resolvedTree, tree);
}