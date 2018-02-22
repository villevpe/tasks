import * as express from 'express'
import * as compression from 'compression'
import { ssr } from './ssr'

server()

function server() {
    const app = express()
        .use(compression())
        .use(express.static('build'))
        .use(ssr)
        .listen(getPort())

    console.log('Server started successfully')
    return app
}

function getPort() {
    return parseInt(process.env.PORT, 10) || 3000
}
