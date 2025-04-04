import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ZIndexProvider} from "./game/gui/windows/WindowContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZIndexProvider>
      <App />
    </ZIndexProvider>
  </StrictMode>,
)
