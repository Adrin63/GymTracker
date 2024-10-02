import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from './App';
import Home from './Home';
import './index.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App/>}>
      <Route path="/" element={<Home/>}/>
    </Route>  
  </Routes>  
  </BrowserRouter>
)