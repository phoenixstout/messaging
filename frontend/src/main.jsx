import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.jsx'
import './stylesheets/index.css'
import Header from './Header.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router></Router>
  </React.StrictMode>,
)
