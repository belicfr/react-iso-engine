import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ZIndexProvider} from "./game/gui/windows/WindowContext.tsx";

createRoot(document.getElementById('root')!).render(
  <> {/*StrictMode disabled to prevent call function twice*/}
    <ZIndexProvider>
      <App />
    </ZIndexProvider>
  </>,
)
