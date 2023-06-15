import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider, createTheme } from '@nextui-org/react';

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
 
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider theme={theme}>
    <App />
    </NextUIProvider>
  </React.StrictMode>,
)
