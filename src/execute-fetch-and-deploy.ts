import {Configurations, Project} from "./types.ts";
import {execSync} from "child_process";

export function ExecuteFetchAndDeploy(configuration: Configurations, resolvedTree: string[], tree: Record<string, {
    project: Project;
    dependencies: Project[]
}>) {
    for (const application of resolvedTree) {
        const project = tree[application].project

        const repo = project.source.split('/').pop()!.split('.').shift()!
        const gitUrl = `git@github.com:${configuration.githubOrganisation}/` + repo + ".git"

        execSync(`${configuration.cloneCommand} ${gitUrl}`, {stdio: 'inherit'})
        execSync(`${configuration.deploymentCommand}`, {stdio: 'inherit'})
    }
}