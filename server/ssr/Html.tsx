import * as React from 'react'

// tslint:disable:jsx-self-close
const Html: React.SFC<{}> = (props) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="theme-color" content="#00716f" />
                <link rel="stylesheet" href="style.css" />
                <title>Tasks</title>
            </head>
            <body>
                <div id="app">{props.children}</div>
                <script src="app.js"></script>
            </body>
        </html>
    )
}

export default Html
