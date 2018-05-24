export enum FileProviderService {
    GoogleDrive = 'google-drive'
}

// See https://developers.google.com/drive/api/v3/reference/files
export interface File {
    id: string,
    name: string,
    mimeType: string,
    provider: FileProviderService,
    created: Date,
    modified: Date,
    size: number,
    thumbnail?: {
        image: string,
        mimeType: string
    }
}

export interface FileResult {
    meta: {
        next: string
    },
    files: File[]
}

export interface FileProvider {
    listFiles: (size: number, page: number) => Promise<FileResult>,
    downloadFile: (id: string) => Promise<{}>
    uploadFile: (id: string, data: {}) => Promise<File>
    findFile: (name: string) => Promise<File>
    createFile: (name: string) => Promise<string>
}
