import {Project} from "./types.ts";
import fetch, {Response} from 'node-fetch';

const fetchDependency = async (p: Project): Promise<any> => {
    if (!process.env.GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is not set")

    let url = p.source
    if(url.includes("https://github.com")) {
        url = url.replace("https://github.com", "https://api.github.com/repos") + `/contents/dependencies.json?ref=${p.version}`
    }

    console.log('Getting dependencies for', {url})
    let resp: Response | undefined = undefined
    try {
        resp = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                "Authorization": "Bearer " + process.env.GITHUB_TOKEN
            }
        })
    } catch (e) {
        throw new Error(`Failed to fetch ${url}`)
    }

    try {
        const json: any = await resp.json()
        const content = JSON.parse(Buffer.from(json.content, 'base64').toString('utf-8'))
        return content
    } catch (e) {
        throw new Error(`Invalid json response from ${url}`)
    }
}

export async function getDependencyFile(p: Project, getDependencyFunc = fetchDependency): Promise<Project[]> {
    const json = await getDependencyFunc(p)

    // Unwrap the json object safely
    if (!json || !Array.isArray(json)) {
        throw new Error(`Invalid json response from ${p.source}`)
    }

    // Convert the json object into a Project[]
    return json.map((p: any) => {
        return {
            name: p.name,
            version: p.version,
            source: p.source
        }
    })
}
