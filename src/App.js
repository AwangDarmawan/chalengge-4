
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notpound from "./pages/NotPound.js";
import PageOne from './pages/PageOne.js';
import DetailFilm from './component/DetailFilm';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<Notpound />} />
        <Route path="/"  element={< PageOne/>}/>
        <Route path="/movie/:id" element={<DetailFilm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
