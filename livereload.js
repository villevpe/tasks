
const { watch } = require('fs')
const { spawn } = require('child_process')
const { resolve } = require('path')
const debounce = require('debounce')

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
        this.process = spawn('sh', ['-c', this.task], { stdio: 'inherit', detached: true })
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
            process.kill(-this.process.pid)
        }
    }
}

(() => {
    const livereload = new Livereload(process.argv[2], process.argv[3])
    livereload.start()
})()
