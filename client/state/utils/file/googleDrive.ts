import { FileProvider, FileResult, FileProviderService, File } from './provider'
import { GoogleApi, GoogleDriveFile } from '../types/google'

export class GoogleFileProvider implements FileProvider {
    private gapi: GoogleApi

    constructor(gapi: GoogleApi) {
        this.gapi = gapi
    }

    downloadFile(id: string): Promise<{}> {
        const request = this.gapi.client.request({
            method: 'GET',
            path: `/drive/v3/files/${id}`,
            params: { alt: 'media' }
        })
        return new Promise((resolve, reject) => {
            request.execute((data: {}) => {
                resolve(data)
            })
        })
    }

    listFiles(size: number = 20, page: number = 0, query?: string): Promise<FileResult> {
        const options = {
            spaces: 'appDataFolder',
            fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime)',
            pageSize: size,
            q: query || undefined
        }
        return this.gapi.client.drive.files
            .list(options)
            .then(response => {
                const result = response.result
                return {
                    meta: {
                        next: result.nextPageToken
                    },
                    files: result.files.map(this.convertFile)
                }
            })
    }

    findFile(name: string) {
        const query = `('appDataFolder' in parents)`
        return this
            .listFiles(10, 0, query)
            .then(result => result.files[0])
    }

    createFile(name: string) {
        return this.gapi.client.drive.files
            .create({
                resource: {
                    name,
                    parents: ['appDataFolder']
                },
                fields: 'id'
            })
            .then(response => response.result.id)
    }

    uploadFile(id: string, data: {}): Promise<File> {
        const request = this.gapi.client.request({
            method: 'PATCH',
            path: `/upload/drive/v3/files/${id}`,
            params: { uploadType: 'media' },
            body: JSON.stringify(data)
        })
        return new Promise((resolve, reject) => {
            request.execute((result: GoogleDriveFile) => {
                resolve(this.convertFile(result))
            })
        })
    }

    private convertFile(file: GoogleDriveFile): File {
        return ({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            provider: FileProviderService.GoogleDrive,
            size: file.size,
            created: file.createdTime ? new Date(file.createdTime) : undefined,
            modified: file.modifiedTime ? new Date(file.modifiedTime) : undefined
        })
    }
}
