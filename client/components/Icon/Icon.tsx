import * as React from 'react'
import './Icon.scss'

export namespace Icons {
    export enum Name {
        Add = 'add',
        Edit = 'edit',
        Filter = 'filter',
        Delete = 'delete',
        Complete = 'complete',
        Revert = 'revert',
        Sync = 'sync',
        CloudSet = 'cloudSet',
        CloudDone = 'cloudDone',
        CloudOff = 'cloudOff'
    }

    export enum Size {
        Small = 'sm',
        Medium = 'md',
        Large = 'lg',
    }

    export enum Color {
        White = 'white',
        Gray = 'gray',
    }

    export interface Props {
        name: Name,
        size?: Size,
        color?: Color
    }
}

/* tslint:disable:max-line-length */
const SVG: { [index: string]: JSX.Element } = {
    [Icons.Name.Add]: (
        <g>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    ),
    [Icons.Name.Edit]: (
        <g>
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    ),
    [Icons.Name.Filter]: (
        <g>
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    ),
    [Icons.Name.Revert]: (
        <g>
            <path d="M12.5,8c-2.65,0-5.05,0.99-6.9,2.6L2,7v9h9l-3.62-3.62c1.39-1.16,3.16-1.88,5.12-1.88c3.54,0,6.55,2.31,7.6,5.5l2.37-0.78 C21.08,11.03,17.15,8,12.5,8z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    ),
    [Icons.Name.Delete]: (
        <g>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    ),
    [Icons.Name.Complete]: (
        <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </g>
    ),
    [Icons.Name.Sync]: (
        <g>
            <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    ),
    [Icons.Name.CloudSet]: (
        <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z" />
        </g>
    ),
    [Icons.Name.CloudOff]: (
        <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z" />
        </g>
    ),
    [Icons.Name.CloudDone]: (
        <g>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17 15.18 9l1.41 1.41L10 17z"/>
        </g>
    )
}
/* tslint:enable:max-line-length */

const getSvg = (name: Icons.Name, color: Icons.Color) => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {SVG[name]}
    </svg>
)

export const Icon: React.SFC<Icons.Props> = ({ name, size = Icons.Size.Small, color = Icons.Color.White }) => (
    <div className={`icon ${size} ${color}`} aria-label={`${name} icon`}>
        {getSvg(name, color)}
    </div>
)  
