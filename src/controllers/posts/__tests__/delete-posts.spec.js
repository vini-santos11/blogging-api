import { deletePost } from '../delete-post'
import { Result } from '../../../types/result';
import * as DeletePostService from "../../../services/posts/delete-post-service";

jest.mock("../../../services/posts/delete-post-service")
jest.mock('../../../repositories/post-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

const params = { id: 'MyId' }

describe('delete-post', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnDeletePostService = jest.spyOn(DeletePostService, 'DeletePostService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnDeletePostService.mockClear()
    })

    test('should return status 200 when delete post action succeed', async () => {
        const mockResult = new Result(200, `Post '${params.id}' deleted successfully`, null)

        const validRequest = { params }
        await deletePost(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 200)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnDeletePostService).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 when does not receive id on request params', async () => {
        const invalidRequest = { params: {} }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Id is required", path: ["id"], received: 'undefined' }
        const mockResult = new Result(400, 'Id is required', zodError)

        await deletePost(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnDeletePostService).not.toHaveBeenCalled()
    })

    test('should return error when create post service fails', async () => {
        const mockResult = new Result(400, 'My Error', null)
        const validRequest = { params }

        jest.spyOn(DeletePostService, 'DeletePostService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await deletePost(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnDeletePostService).toHaveBeenCalledTimes(1)
    })
})
