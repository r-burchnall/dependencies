import {Configurations, Project} from "./types.ts";
import {execSync} from "child_process";
import fs from 'node:fs'

export function ExecuteFetchAndDeploy(configuration: Configurations, resolvedTree: string[], tree: Record<string, {
    project: Project;
    dependencies: Project[]
}>) {
    for (const application of resolvedTree) {
        const project = tree[application].project

        const repo = project.source.split('/').pop()!.split('.').shift()!
        const gitUrl = `git@github.com:${configuration.githubOrganisation}/` + repo + ".git"

        try {
            fs.statSync(repo)
        } catch (e) {
            console.log('Cloning repo', {gitUrl})
            execSync(`${configuration.cloneCommand} ${gitUrl}`, {stdio: 'inherit'})
        }

        const isTag = project.version.match(/^[v]?\d.\d.\d$/)
        console.log(`${repo}: Checking out project ${isTag ? 'tag' : 'branch'}: ${project.version}`)
        execSync(`cd ${repo} && git fetch --all --tags && git checkout ${isTag ? 'tags/' + project.version : project.version}`, {stdio: 'inherit'})

        console.log(`${repo}: Running deployment out project version: ${project.version}`)
        execSync(`cd ${repo} && ${configuration.deploymentCommand}`, {stdio: 'inherit'})
    }
}
