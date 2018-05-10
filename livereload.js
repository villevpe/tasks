
const { watch } = require('fs')
const { spawn, exec } = require('child_process')
const { resolve } = require('path')
const debounce = require('debounce')

const WIN_PLATFORM = 'win32'
const MACOS_PLATFORM = 'darwin'
const BASH = '/bin/bash'
const SHELL = '/bin/sh'
const POWERSHELL = 'C:/Windows/System32/WindowsPowershell/v1.0'

/**
 * Simple livereload wrapper for any kind of task that can be run in shell.
 * Works by running the provided task in a shell wrapper that gets restarted automatically after a change occurs
 * in the provided watch directory.
 * 
 * The plugin uses native NodeJS fs.watch, so some caveats apply regarding the change detection
 * @see https://nodejs.org/docs/latest/api/fs.html#fs_caveats
 */

class Livereload {

    constructor(task, dirToMonitor = __dirname, debounceTime = 3000) {
        if (!task) {
            throw new Error('No livereload task specified')
        }
        this.task = task
        this.dirToMonitor = resolve(__dirname, dirToMonitor)
        this.debounceTime = debounceTime
    }

    get isWindows() {
        return process.platform === WIN_PLATFORM
    }

    get isMacOS() {
        return process.platform === MACOS_PLATFORM
    }

    get shell() {
        return process.env.SHELL || (this.isMacOS ? BASH : SHELL)
    }

    /** 
     * Restart the task.
     * @private
     */
    restart(event, file) {
        console.info(`Change in ${file}, restarting...`)
        this.stop()
        this.run()
    }

    /** 
     * Run the provided task in a shell wrapper. Using shell here makes streaming the logs possible
     * @private
     */
    run() {
        if (this.isWindows) {
            this.process = exec(this.task)
            this.process.stdout.pipe(process.stdout)
            this.process.stderr.pipe(process.stderr)
        } else {
            this.process = spawn(this.shell, ['-c', this.task], { stdio: 'inherit', detached: true })
        }
    }

    /** 
     * Start the livereload process by binding restart action to the file watcher events. 
     * The process uses debounce with configurable interval to keep performance in check.
     * Also binds an exit handler automatically to ensure that no zombie processes are left behind 
     * @public
     */
    start() {
        console.info('Starting livereload')
        process.on('exit', this.stop.bind(this))
        this.run()

        // Recursive doesn't support linux
        watch(this.dirToMonitor, { persistent: true, recursive: true }, debounce(this.restart.bind(this), this.debounceTime))
    }

    /** 
     * Stop the task in execution. Called automatically before the main process exits
     * @public
     */
    stop() {
        if (this.process && this.process.pid) {
            if (this.isWindows) {
                /**
                 * Spawn a new process to kill the current process for Windows
                 * @see https://stackoverflow.com/questions/23706055/why-can-i-not-kill-my-child-process-in-nodejs-on-windows
                 */
                spawn('taskkill', ['/pid', this.process.pid, '/f', '/t'])
            } else {
                process.kill(-this.process.pid)
            }
        }
    }
}

(() => {
    const livereload = new Livereload(process.argv[2], process.argv[3])
    livereload.start()
})()
