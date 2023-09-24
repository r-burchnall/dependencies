import { expect, test } from 'bun:test';
import {resolveDependencyTree} from "./dep-tree.ts";

test('dep-tree - graph 1', () => {
    const directedDependencyGraph: Record<string, string[]> = {
        'g': ['e', 'd'],
        'f': ['c'],
        'e': ['c'],
        'd': ['b'],
        'c': ['a'],
        'b': ['a'],
        'a': []
    }

    const expected = ['a', 'b', 'c', 'd', 'e', 'g'];
    const got = resolveDependencyTree('g', directedDependencyGraph);
    expect(got).toEqual(expected);
})

test('dep-tree - graph 2', () => {
    const directedDependencyGraph: Record<string, string[]> = {
        'g': ['e'],
        'f': ['c'],
        'e': ['d', 'f'],
        'd': ['b'],
        'c': ['a'],
        'b': ['a'],
        'a': []
    }

    const expected = ['a', 'c', 'b', 'f', 'd', 'e', 'g']
    const got = resolveDependencyTree('g', directedDependencyGraph);
    expect(got).toEqual(expected)
})

test('dep-tree - rath-dev', () => {
    const directedDependencyGraph: Record<string, string[]> = {
        'rath-etl': ['rath-app', 'rath-base', 'ssm-key', 'management-account', 'devops', 'dns'],
        'rath-app': ['rath-base', 'management-account', 'devops', 'dns'],
        'rath-base': [],
        'ssm-key': [],
        'management-account': [],
        'devops': [],
        'dns': []
    }

    const expected = ['dns', 'devops', 'management-account', 'ssm-key', 'rath-base', 'rath-app', 'rath-etl']
    const got = resolveDependencyTree('rath-etl', directedDependencyGraph);
    expect(got).toEqual(expected)
})