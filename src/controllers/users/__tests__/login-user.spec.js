import { loginUser } from '../login-user'
import { Result } from '../../../types/result';
import * as LoginUserService from "../../../services/users/login-user-service";

jest.mock('../../../services/users/login-user-service')

jest.mock('../../../repositories/user-repository', () => ({
    create: jest.fn(),
    save: jest.fn()
}))

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
}))

const passwordHash = '$2a$08$dlr88SM1a82Ji0eyJswbCuBiYQPObtwEwQuLc5QeJlVCLpaLQV7/O'

const body = {
    username: 'madonna',
    password: 'holidayy',
}

describe('login-user', () => {
    const send = jest.fn()
    const response = { status: jest.fn(() => ({ send })) }
    const spyOnLoginUserService = jest.spyOn(LoginUserService, 'LoginUserService')

    beforeEach(() => {
        response.status.mockClear()
        send.mockClear()
        spyOnLoginUserService.mockClear()
    })

    test('should return status 200 when user is authenticated', async () => {
        jest.spyOn(LoginUserService, 'LoginUserService').mockReturnValueOnce({
            execute: () => ({ password: passwordHash })
        })

        const mockResult = new Result(200, `User ${body.username} authenticated`, { token: undefined })

        const validRequest = { body }
        await loginUser(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 200)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnLoginUserService).toHaveBeenCalledTimes(1)
    })

    test('should return status 400 when does not receive username on request body', async () => {
        const invalidRequest = { body: { password: 'holidayy' } }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Username is required", path: ["username"], received: 'undefined' }
        const mockResult = new Result(400, 'Username is required', zodError)

        await loginUser(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnLoginUserService).not.toHaveBeenCalled()
    })

    test('should return status 400 when does not receive password on request body', async () => {
        const invalidRequest = { body: { username: 'madonna' } }
        const zodError = { code: 'invalid_type', expected: 'string', message: "Password is required", path: ["password"], received: 'undefined' }
        const mockResult = new Result(400, 'Password is required', zodError)

        await loginUser(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnLoginUserService).not.toHaveBeenCalled()
    })

    test('should return 404 when user type an invalid password', async () => {
        jest.spyOn(LoginUserService, 'LoginUserService').mockReturnValueOnce({
            execute: () => ({ password: passwordHash })
        })

        const mockResult = new Result(404, 'Username or password is incorrect', null)

        const invalidRequest = { body: { username: 'madonna', password: 'celebrate' } }

        await loginUser(invalidRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 404)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnLoginUserService).toHaveBeenCalledTimes(1)
    })

    test('should return error when login user service fails', async () => {
        const mockResult = new Result(400, 'Error: My Error', null)
        const validRequest = { body }

        jest.spyOn(LoginUserService, 'LoginUserService').mockReturnValueOnce({
            execute: () => { throw new Error("My Error") }
        })

        await loginUser(validRequest, response)

        expect(response.status).toHaveBeenNthCalledWith(1, 400)
        expect(send).toHaveBeenNthCalledWith(1, mockResult)
        expect(spyOnLoginUserService).toHaveBeenCalledTimes(1)
    })
})
