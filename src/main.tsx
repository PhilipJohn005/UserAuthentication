import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
