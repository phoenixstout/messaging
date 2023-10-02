import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Router from './Router.jsx'
import './stylesheets/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router></Router>
  </React.StrictMode>,
)
