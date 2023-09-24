import {Configurations} from "../types.ts";
import {Deploy} from "../deploy.ts";

const configuration: Configurations = {
    desiredApplications: [
        { name: 'project-c', source: 'https://raw.githubusercontent.com/r-burchnall/dependencies/main/examples/project-c/dependencies.json', version: '1.0.0' },
    ],
    cloneCommand:  `echo "git clone"`,
    deploymentCommand:  `echo "make deploy"`,
    debug: true,
    githubOrganisation: 'r-burchnall'
}

async function main() {
    await Deploy(configuration);
}

main().catch((err) => {
    console.error(err)
})