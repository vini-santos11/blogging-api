import { createUser } from '../create-user'
import { Result } from '../../../types/result';
import * as CreateUserService from "../../../services/users/create-user-service";

const passwordHash = '$2a$08$dlr88SM1a82Ji0eyJswbCuBiYQPObtwEwQuLc5QeJlVCLpaLQV7/O'

jest.mock('../../../services/users/create-user-service')

jest.mock('../../../repositories/user-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

jest.mock('bcryptjs', () => ({
    hash: () => passwordHash,
}))

const body = {
    username: 'madonna',
    password: 'holidayy',
}

describe('create-user', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnCreateUserService = jest.spyOn(CreateUserService, 'CreateUserService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnCreateUserService.mockClear()
    })

    test('should return status 200 when user is authenticated', async () => {
        const user = { id: 'IAmAnId', username: body.username, createdAt: 'IAmADate' }
        jest.spyOn(CreateUserService, 'CreateUserService').mockReturnValueOnce({
            execute: () => (user)
        })

        const mockResult = new Result(201, 'User created successfully', user)

        const validRequest = { body }
        await createUser(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 201)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreateUserService).toHaveBeenCalledTimes(1)

    })

    test('should return status 400 when does not receive username on request body', async () => {
        const invalidRequest = { body: { password: 'holidayy' } }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Username is required", path: ["username"], received: 'undefined' }
        const mockResult = new Result(400, 'Username is required', zodError)

        await createUser(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreateUserService).not.toHaveBeenCalled()
    })

    test('should return status 400 when does not receive password on request body', async () => {
        const invalidRequest = { body: { username: 'madonna' } }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Password is required", path: ["password"], received: 'undefined' }
        const mockResult = new Result(400, 'Password is required', zodError)

        await createUser(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreateUserService).not.toHaveBeenCalled()
    })

    test('should return error when login user service fails', async () => {
        const mockResult = new Result(400, 'My Error', null)
        const validRequest = { body }

        jest.spyOn(CreateUserService, 'CreateUserService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await createUser(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnCreateUserService).toHaveBeenCalledTimes(1)
    })
})
