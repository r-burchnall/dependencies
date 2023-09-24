# Modular Infrastructure automation
## Description
This is a framework to discover a standardised set of infrastructre. It was designed to solve a problem where
we want to deploy a certain application but we don't know what infrastructure is available. This framework
allows us to discover the infrastructure and then deploy the application.

It is expected that our infrastrucutre is a intellegent enough to know if it already has been deployed. Such as TF remote state
or CDK and cloudformation stacks.

## Usage
1. Create a dependencies.json in the root of the project
2. Ensure there is a `Makefile` in the root of the project
3. Add your project to the desired configurations


## Contributing
### Tests
Generally, just make sure that we are asserting functions do what they are supposed to do. If you are adding a new function, please add a test for it.

### Graphs
Given  that visualising a graph can be hard from the code, I have created a [Excalidraw](https://excalidraw.com/) diagram to help visualise the graph. You can find it here:
https://excalidraw.com/#json=_6xa8NdUg2RyWHhUlkv1K,gEX3Wq9GTQuSwZt8dza_tA