import * as express from 'express'
import * as compression from 'compression'
import { ssr } from './ssr'

const PORT = parseInt(process.env.PORT, 10) || 3000

server(PORT)

function server(port: number) {
    return express()
        .use(compression())
        .use(express.static('build'))
        .use(ssr)
        .listen(port)
}
