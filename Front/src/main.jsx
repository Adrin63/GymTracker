import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Auth/Landing';
import Home from './pages/Home';
import './index.css';
import Register from './pages/Auth/Register';

import App from './pages/App';
import NewRoutine from './pages/Rutines/NewRoutine';
import MuscularGroupSelector from './pages/Rutines/MuscularGroupSelector';
import ExercisesRutineSelector from './pages/Rutines/ExercisesRutineSelector';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/newRoutine" element={<NewRoutine/>}>
          <Route path="muscles" element={<MuscularGroupSelector/>}/>
          <Route path="exercises" element={<ExercisesRutineSelector/>}/>
        </Route>
      </Route>
    </Routes>  
  </BrowserRouter>
)