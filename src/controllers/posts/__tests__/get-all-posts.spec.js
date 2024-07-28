import { Request } from "express";
import { getAllPosts } from '../get-all-posts'
import { Result } from '../../../types/result';
import * as GetAllPostsService from "../../../services/posts/get-all-posts-service";

jest.mock('../../../services/posts/get-all-posts-service')
jest.mock('../../../repositories/post-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

const validRequest = Request

describe('get-all', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnGetAllPostsService = jest.spyOn(GetAllPostsService, 'GetAllPostsService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnGetAllPostsService.mockClear()
    })

    test('should return status 200 when get all posts action succeed', async () => {
        const mockResult = new Result(200, 'Success', null)

        await getAllPosts(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 200)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetAllPostsService).toHaveBeenCalledTimes(1)
    })

    test('should return error when get all posts service fails', async () => {
        const mockResult = new Result(400, 'Error: My Error', null)

        jest.spyOn(GetAllPostsService, 'GetAllPostsService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await getAllPosts(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetAllPostsService).toHaveBeenCalledTimes(1)
    })
})
