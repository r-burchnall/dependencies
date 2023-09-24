export function resolveDependencyTree(desiredService: string, graph: Record<string, string[]>): string[] {
    const start = desiredService

    const visited = new Set<string>()
    const queue = [start]
    const result = []

    while (queue.length > 0) {
        const current = queue.shift()!
        if (visited.has(current)) {
            continue
        }
        visited.add(current)
        result.push(current)
        queue.push(...graph[current])
    }

    return result.reverse()
}