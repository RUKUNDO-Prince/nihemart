import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from  "react-query"
import './utils/i18n.js'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
