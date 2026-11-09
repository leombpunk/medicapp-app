import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import '@fontsource/ubuntu/300.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource/ubuntu/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './react/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)
