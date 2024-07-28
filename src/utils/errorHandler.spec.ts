import { handlePostNotFound, handleUserAlreadyExists, handleInvalidCredentialsError } from './errorHandler'

describe('errorHandler', () => {
    it('should throw error with message of post not found', () => {
        expect(() => handlePostNotFound()).toThrow({ name: 'Not found', message: 'Post not found' })
    })

    it('should throw error with message user already exists', () => {
        expect(() => handleUserAlreadyExists()).toThrow({ name: 'Conflict', message: 'User already exists' })
    })

    it('should throw error with message username or password incorrect', () => {
        expect(() => handleInvalidCredentialsError()).toThrow({ name: 'Invalid', message: "Username or password is incorrect" })
    })
})