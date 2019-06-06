import express from 'express'
import compression from 'compression'
import { networkInterfaces } from 'os'
import { ssr } from './ssr'

server()

function server() {
    const port = getPort()
    const app = express()
        .use(compression())
        .use(express.static('build'))
        .use(ssr)
        .listen(port)

    if (process.env.NODE_ENV === 'development') {
        console.log(`Server running @ ${getLocalAddress()}:${port}`)
    } else {
        console.log('Server started successfully')
    }
    return app
}

function getPort() {
    return parseInt(process.env.PORT, 10) || 3000
}

function getLocalAddress() {
    return Object
        .values(networkInterfaces())
        .map(info => info.find(({ family, internal }) => family === 'IPv4' && !internal))
        .filter(Boolean)[0].address
}
