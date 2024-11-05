import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Auth/Landing';
import Home from './pages/Home';
import './index.css';
import Register from './pages/Auth/Register';

import App from './pages/App';
import CreateRoutine from './pages/Routines/NewRoutine/CreateRoutine';
import MuscularGroupSelector from './pages/Routines/NewRoutine/MuscularGroupSelector';
import ExercisesSelector from './pages/Routines/NewRoutine/ExercisesSelector';
import Routine from './pages/Routines/Routine';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:routineName" element={<Routine/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/createRoutine" element={<CreateRoutine/>}>
          <Route path="muscles" element={<MuscularGroupSelector/>}/>
          <Route path="exercises" element={<ExercisesSelector/>}/>
        </Route>
      </Route>
    </Routes>  
  </BrowserRouter>
)