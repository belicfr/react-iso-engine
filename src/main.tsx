import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ZIndexProvider} from "./game/gui/windows/WindowContext.tsx";
import login from "./io/auth.ts";
import {ConnectionProvider} from "./io/ConnectionContext.tsx";

createRoot(document.getElementById('root')!).render(
  <> {/*StrictMode disabled to prevent call function twice*/}
    <ZIndexProvider>
      <ConnectionProvider>
        <App />
      </ConnectionProvider>
    </ZIndexProvider>
  </>,
)
