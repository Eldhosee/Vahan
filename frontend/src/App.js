import React from 'react'
import './App.css';
import Form from './pages/Formui.js';
import Tableui from './pages/Table.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tableui />}/>
          
          <Route path="/add" element={<Form />} />
         
        
      </Routes>
      </BrowserRouter>
    </>

  );
};


export default App;
