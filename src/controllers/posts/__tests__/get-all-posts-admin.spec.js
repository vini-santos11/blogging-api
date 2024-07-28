import { Request } from "express";
import { getAllPostsAdmin } from '../get-all-posts-admin'
import { Result } from '../../../types/result';
import * as GetAllPostsAdminService from "../../../services/posts/get-all-posts-admin-service";

jest.mock('../../../services/posts/get-all-posts-admin-service')
jest.mock('../../../repositories/post-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

const validRequest = Request

describe('get-all-posts-admin', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnGetAllPostsAdminService = jest.spyOn(GetAllPostsAdminService, 'GetAllPostsAdminService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnGetAllPostsAdminService.mockClear()
    })

    test('should return status 200 when get all posts admin action succeed', async () => {
        const mockResult = new Result(200, 'Success', null)

        await getAllPostsAdmin(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 200)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetAllPostsAdminService).toHaveBeenCalledTimes(1)
    })

    test('should return error get all posts service fails', async () => {
        const mockResult = new Result(400, 'Error: My Error', null)

        jest.spyOn(GetAllPostsAdminService, 'GetAllPostsAdminService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await getAllPostsAdmin(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetAllPostsAdminService).toHaveBeenCalledTimes(1)
    })
})
