export interface GoogleDriveFile {
    kind: string,
    id: string,
    name: string,
    mimeType: string,
    description: string,
    starred: boolean,
    trashed: boolean,
    explicitlyTrashed: boolean,
    trashingUser: {
        kind: string,
        displayName: string,
        photoLink: string,
        me: boolean,
        permissionId: string,
        emailAddress: string
    },
    trashedTime: string,
    parents: [
        string
    ],
    properties: {
        [key: string]: string
    },
    appProperties: {
        [key: string]: string
    },
    spaces: [
        string
    ],
    version: number,
    webContentLink: string,
    webViewLink: string,
    iconLink: string,
    hasThumbnail: boolean,
    thumbnailLink: string,
    thumbnailVersion: number,
    viewedByMe: boolean,
    viewedByMeTime: string,
    createdTime: string,
    modifiedTime: string,
    modifiedByMeTime: string,
    modifiedByMe: boolean,
    sharedWithMeTime: string,
    sharingUser: {
        kind: string,
        displayName: string,
        photoLink: string,
        me: boolean,
        permissionId: string,
        emailAddress: string
    },
    owners: [
        {
            kind: string,
            displayName: string,
            photoLink: string,
            me: boolean,
            permissionId: string,
            emailAddress: string
        }
    ],
    teamDriveId: string,
    lastModifyingUser: {
        kind: string,
        displayName: string,
        photoLink: string,
        me: boolean,
        permissionId: string,
        emailAddress: string
    },
    shared: boolean,
    ownedByMe: boolean,
    capabilities: {
        canAddChildren: boolean,
        canChangeViewersCanCopyContent: boolean,
        canComment: boolean,
        canCopy: boolean,
        canDelete: boolean,
        canDownload: boolean,
        canEdit: boolean,
        canListChildren: boolean,
        canMoveItemIntoTeamDrive: boolean,
        canMoveTeamDriveItem: boolean,
        canReadRevisions: boolean,
        canReadTeamDrive: boolean,
        canRemoveChildren: boolean,
        canRename: boolean,
        canShare: boolean,
        canTrash: boolean,
        canUntrash: boolean
    },
    viewersCanCopyContent: boolean,
    writersCanShare: boolean,
    permissions: [
        string
    ],
    permissionIds: [
        string
    ],
    hasAugmentedPermissions: boolean,
    folderColorRgb: string,
    originalFilename: string,
    fullFileExtension: string,
    fileExtension: string,
    md5Checksum: string,
    size: number,
    quotaBytesUsed: number,
    headRevisionId: string,
    contentHints: {
        thumbnail: {
            image: string,
            mimeType: string
        },
        indexableText: string
    },
    imageMediaMetadata: {
        width: number,
        height: number,
        rotation: number,
        location: {
            latitude: number,
            numberitude: number,
            altitude: number
        },
        time: string,
        cameraMake: string,
        cameraModel: string,
        exposureTime: number,
        aperture: number,
        flashUsed: boolean,
        focalLength: number,
        isoSpeed: number,
        meteringMode: string,
        sensor: string,
        exposureMode: string,
        colorSpace: string,
        whiteBalance: string,
        exposureBias: number,
        maxApertureValue: number,
        subjectDistance: number,
        lens: string
    },
    videoMediaMetadata: {
        width: number,
        height: number,
        durationMillis: number
    },
    isAppAuthorized: boolean
}

export interface GoogleDriveResponse {
    headers: { [k: string]: string },
    body: string,
    status: number,
    statusText: string
}

export interface GoogleDriveFileCreateResponse extends GoogleDriveResponse {
    result: {
        id: string
    }
}

export interface GoogleDriveFileResponse extends GoogleDriveResponse {
    result: {
        files: GoogleDriveFile[],
        nextPageToken?: string
    }
}

export interface GoogleDriveListFilesOptions {
    pageSize: number
    fields: string
    spaces: string
}

export interface GoogleDriveListFilesOptions {
    spaces: string
    fields: string
    pageSize: number,
    q?: string
}

export interface GoogleDriveCreateFileOptions {
    resource: {
        name: string,
        parents: string[]
    }
    fields: string
}

export interface GoogleApi {
    load: (libName: string, callback: () => void) => void
    client: {
        init: (
            options: {
                apiKey: string
                clientId: string
                scope: string
                discoveryDocs: string[]
            }
        ) => Promise<void>,
        drive: {
            files: {
                get: (options: { fileId: string, alt: string }) => Promise<GoogleDriveFileResponse>
                create: (options: GoogleDriveCreateFileOptions) => Promise<GoogleDriveFileCreateResponse>
                list: (options: GoogleDriveListFilesOptions) => Promise<GoogleDriveFileResponse>
            }
        },
        request: (options: { method: string, path: string, params: {}, body?: string }) => {
            execute: (callback: (data: {}) => void) => void
        }
    },
    auth2: {
        getAuthInstance: () => GoogleAuthenticationInstance
    }
}

export interface GoogleAuthenticationInstance {
    isSignedIn: {
        listen: (callback: () => void) => void
        get: () => boolean
    },
    currentUser: { get: () => {} }
    signIn: () => Promise<{}>
    signOut: () => Promise<{}>
    then: (callback: Function) => Promise<{}>
}

export interface WindowWithGoogleApi extends Window {
    gapi: GoogleApi
}

export interface GoogleErrorResponse {
    error: string
}
