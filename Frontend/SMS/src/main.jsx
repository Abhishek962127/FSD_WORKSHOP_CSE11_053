import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './component/Home.jsx'
import Aboutus from './component/Aboutus.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Home/>
    <Aboutus/>
  </StrictMode>,
)
