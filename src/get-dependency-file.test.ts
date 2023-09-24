import {describe, expect, test} from "bun:test";
import {getDependencyFile} from "./get-dependency-file.ts";
import {Project} from "./types.ts";

describe('get-dependency-file', () => {
    test('should map json to Project[]', async () => {
        const got = await getDependencyFile({
            name: 'test',
            version: '1.0.0',
            source: 'test'
        }, async (p: Project) => {
            return [{
                name: 'test',
                version: '1.0.0',
                source: 'test'
            }]
        })

        const expected = [{
            name: 'test',
            version: '1.0.0',
            source: 'test'
        }]

        expect(got).toEqual(expected)
    })

    test('should omit any invalid json attributes', async () => {
        const got = await getDependencyFile({
            name: 'test',
            version: '1.0.0',
            source: 'test'
        }, async (p: Project) => {
            return [{
                name: 'test',
                version: '1.0.0',
                source: 'test',
                invalid: 'invalid'
            }]
        })

        const expected = [{
            name: 'test',
            version: '1.0.0',
            source: 'test'
        }]

        expect(got).toEqual(expected)
    })

    test('should only use source attribute', async () => {
        const got = await getDependencyFile({
            source: 'test'
        } as any, async (p: Project) => {
            expect(p.source).toEqual('test')
            return [{
                name: 'test',
                version: '1.0.0',
                source: 'test',
            }]
        })

        const expected = [{
            name: 'test',
            version: '1.0.0',
            source: 'test'
        }]

        expect(got).toEqual(expected)
    })

    test('should throw error if json is invalid', async () => {
        try {
            await getDependencyFile({
                name: 'test',
                version: '1.0.0',
                source: 'test'
            }, async (p: Project) => {
                return 'invalid'
            })

            throw new Error('should not reach here')
        } catch (e: unknown) {
            expect((e as Error).message).toEqual('Invalid json response from test')
        }
    })

    test('should throw error if json is not array', async () => {
        try {
            await getDependencyFile({
                name: 'test',
                version: '1.0.0',
                source: 'test'
            }, async (p: Project) => {
                return {obj: 'invalid'}
            })

            throw new Error('should not reach here')
        } catch (e: unknown) {
            expect((e as Error).message).toEqual('Invalid json response from test')
        }
    })
})