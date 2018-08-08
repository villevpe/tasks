
export enum Env {
    GoogleApiKey = 'GOOGLE_API_KEY',
    GoogleClientID = 'GOOGLE_CLIENT_ID'
}

const environmentVariables = process.env

export function getEnvironmentVariable<T>(key: Env) {
    const value = environmentVariables[key] as {}
    if (environmentVariables.NODE_ENV === 'test') {
        return ''
    }
    if (!value) {
        throw new Error(`Couldn't find environment variable ${key}`)
    }
    return value as T
}
