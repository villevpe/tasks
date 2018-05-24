export interface AuthProvider {
    isSignedIn: boolean
    api: {}
    user: {}
    initialize: () => Promise<void>
    login: () => Promise<void>
    logout: () => Promise<void>
}
