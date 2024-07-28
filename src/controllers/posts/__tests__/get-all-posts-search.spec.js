import { Request } from "express";
import { getAllPostsSearch } from '../get-all-posts-search'
import { Result } from '../../../types/result';
import * as GetAllPostsSearchService from "../../../services/posts/get-all-posts-search-service";

jest.mock('../../../services/posts/get-all-posts-search-service')
jest.mock('../../../repositories/post-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

const validRequest = { ...Request, query: { keyword: 'Vogue' } }

describe.only('get-all-posts-search', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnGetAllPostsSearchService = jest.spyOn(GetAllPostsSearchService, 'GetAllPostsSearchService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnGetAllPostsSearchService.mockClear()
    })

    test('should return status 200 when get all posts search action succeed', async () => {
        const mockResult = new Result(200, 'Success', null)

        await getAllPostsSearch(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 200)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetAllPostsSearchService).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 when does not receive key on request query params', async () => {
        const zodError = { code: 'invalid_type', expected: 'string', message: "Keyword is required", path: ["keyword"], received: 'undefined' }
        const mockResult = new Result(400, 'Keyword is required', zodError)

        await getAllPostsSearch({ ...Request, query: {} }, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetAllPostsSearchService).not.toHaveBeenCalled()
    })

    test('should return status 400 when get all posts search service fails', async () => {
        const mockResult = new Result(400, 'Error: My Error', null)

        jest.spyOn(GetAllPostsSearchService, 'GetAllPostsSearchService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await getAllPostsSearch(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetAllPostsSearchService).toHaveBeenCalledTimes(1)
    })
})
