
export enum Env {
    GoogleApiKey = 'GOOGLE_API_KEY',
    GoogleClientID = 'GOOGLE_CLIENT_ID'
}

// Custom environment variables from local envs
declare const ENV: {[i: string]: {}}

export function getEnvironmentVariable<T>(key: Env) {
    if (process.env.NODE_ENV === 'test') {
        return ''
    }
    const value = (ENV[key] || process.env[key]) as {}

    if (!value) {
        throw new Error(`Couldn't find environment variable ${key}`)
    }
    return value as T
}
