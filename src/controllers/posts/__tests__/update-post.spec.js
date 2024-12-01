import { updatePost } from '../update-post'
import { Result } from '../../../types/result';
import * as UpdatePostService from "../../../services/posts/update-post-service";

jest.mock('../../../services/posts/update-post-service')
jest.mock('../../../repositories/post-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

const params = { id: 'MyId' }
const body = {
    title: 'I Am A Title',
    content: 'I Am A Content',
    author: 'Passapusso'
}

describe('update-post', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnUpdatePostService = jest.spyOn(UpdatePostService, 'UpdatePostService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnUpdatePostService.mockClear()
    })

    test('should return status 200 when update post action succeed', async () => {
        const mockResult = new Result(200, `Post '${params.id}' updated successfully`, null)

        const validRequest = { body, params }
        await updatePost(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 200)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnUpdatePostService).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 when does not receive content on request body', async () => {
        const invalidRequest = { body: { title: 'I Am A Title', author: 'Passapusso' }, params }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Content is required", path: ["content"], received: 'undefined' }
        const mockResult = new Result(400, 'Content is required', zodError)

        await updatePost(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnUpdatePostService).not.toHaveBeenCalled()
    })

    test('should return status 400 when does not receive title on request body', async () => {
        const invalidRequest = { body: { content: 'I Am A Content', author: 'Passapusso' }, params }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Title is required", path: ["title"], received: 'undefined' }
        const mockResult = new Result(400, 'Title is required', zodError)

        await updatePost(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnUpdatePostService).not.toHaveBeenCalled()
    })

    test('should return status 400 when does not receive id on request params', async () => {
        const invalidRequest = { body, params: {} }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Id is required", path: ["id"], received: 'undefined' }
        const mockResult = new Result(400, 'Id is required', zodError)

        await updatePost(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnUpdatePostService).not.toHaveBeenCalled()
    })

    test.todo('should return status 400 when does not receive author on request body')

    test('should return error when update post service fails', async () => {
        const mockResult = new Result(400, 'My Error', null)
        const validRequest = { body, params }

        jest.spyOn(UpdatePostService, 'UpdatePostService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await updatePost(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnUpdatePostService).toHaveBeenCalledTimes(1)
    })
})
