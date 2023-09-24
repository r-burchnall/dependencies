import {Project} from "./types.ts";

const fetchDependency = async (p: Project): Promise<any> => {
    const resp = await fetch(p.source)
    console.log('resp', {resp})
    return await resp.json()
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