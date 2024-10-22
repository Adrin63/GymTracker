import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from './Landing';
import Home from './Home';
import './index.css';
import Register from './Register';

import App from './App';
import NewRoutine from './NewRoutine';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/NewRoutine" element={<NewRoutine/>}/>
      </Route>
    </Routes>  
  </BrowserRouter>
)