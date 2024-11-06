import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TextToImage from './TextToImage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TextToImage />
  </StrictMode>,
)
