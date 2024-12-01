import { getPostById } from '../get-post-by-id'
import { Result } from '../../../types/result';
import * as GetPostByIdService from "../../../services/posts/get-post-by-id-service";

jest.mock("../../../services/posts/get-post-by-id-service")
jest.mock('../../../repositories/post-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

const params = { id: 'MyId' }

describe('get-all-post-by-id', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnGetPostByIdService = jest.spyOn(GetPostByIdService, 'GetPostByIdService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnGetPostByIdService.mockClear()
    })

    test('should return status 200 when delete post action succeed', async () => {
        const mockResult = new Result(200, 'Success', null)

        const validRequest = { params }
        await getPostById(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 200)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetPostByIdService).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 when does not receive id on request params', async () => {
        const invalidRequest = { params: {} }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Id is required", path: ["id"], received: 'undefined' }
        const mockResult = new Result(400, 'Id is required', zodError)

        await getPostById(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetPostByIdService).not.toHaveBeenCalled()
    })

    test('should return status 400 when create post service fails', async () => {
        const mockResult = new Result(400, 'My Error', null)
        const validRequest = { params }

        jest.spyOn(GetPostByIdService, 'GetPostByIdService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await getPostById(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnGetPostByIdService).toHaveBeenCalledTimes(1)
    })
})
