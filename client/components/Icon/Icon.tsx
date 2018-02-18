import * as React from 'react'
import './Icon.scss'

export namespace Icons {
  export enum Names {
    Add = 'add',
    Filter = 'filter',
    Delete = 'delete',
  }

  export enum Sizes {
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
  }

  export enum Colors {
    White = 'white',
    Gray = 'gray',
  }

  export interface Props {
    name: Names,
    size?: Sizes,
    color?: Colors
  }
}

/* tslint:disable:max-line-length */
const SVG: { [index: string]: JSX.Element } = {
  [Icons.Names.Add]: (
    <g>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  ),
  [Icons.Names.Filter]: (
    <g>
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  ),
  [Icons.Names.Delete]: (
    <g>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </g>
  )
}
/* tslint:enable:max-line-length */

const getSvg = (name: Icons.Names, color: Icons.Colors) => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    {SVG[name]}
  </svg>
)

export const Icon: React.SFC<Icons.Props> = ({ name, size = Icons.Sizes.Small, color = Icons.Colors.White }) => (
  <div className={`icon ${size} ${color}`} aria-label={`${name} icon`}>
    {getSvg(name, color)}
  </div>
)  
