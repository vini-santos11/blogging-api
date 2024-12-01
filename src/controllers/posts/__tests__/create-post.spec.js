import { createPost } from '../create-post'
import { Result } from '../../../types/result';
import * as CreatePostService from "../../../services/posts/create-post-service";

jest.mock('../../../services/posts/create-post-service')
jest.mock('../../../repositories/post-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

const body = {
    title: 'I Am A Title',
    content: 'I Am A Content',
    author: 'Liniker'
}

describe('create-post', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnCreatePostService = jest.spyOn(CreatePostService, 'CreatePostService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnCreatePostService.mockClear()
    })

    test('should return status 201 when create post action succeed', async () => {
        const mockResult = new Result(201, `Post '${body.title}' created successfully`, null)

        const validRequest = { body }
        await createPost(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 201)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreatePostService).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 when does not receive content on request body', async () => {
        const invalidRequest = { body: { title: 'I Am A Title', author: 'Liniker' } }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Content is required", path: ["content"], received: 'undefined' }
        const mockResult = new Result(400, 'Content is required', zodError)

        await createPost(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreatePostService).not.toHaveBeenCalled()
    })

    test('should return status 400 when does not receive title on request body', async () => {
        const invalidRequest = { body: { content: 'I Am A Content', author: 'Liniker' } }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Title is required", path: ["title"], received: 'undefined' }
        const mockResult = new Result(400, 'Title is required', zodError)

        await createPost(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreatePostService).not.toHaveBeenCalled()
    })

    test.todo('should return status 400 when does not receive author on request body')

    test('should return error when create post service fails', async () => {
        const mockResult = new Result(400, 'My Error', null)
        const validRequest = { body }

        jest.spyOn(CreatePostService, 'CreatePostService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await createPost(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreatePostService).toHaveBeenCalledTimes(1)
    })
})
