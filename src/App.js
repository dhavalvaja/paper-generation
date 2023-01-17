import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AddBlueprint from './Pages/addblueprint';
import AddCO from './Pages/addco';
import AddQuestion from './Pages/addquestion';
import AddSubject from './Pages/addchapter';
import Home from './Pages/Home';
import GeneratePaper from './Pages/generatePaper';
import NavigationBar from './Components/navbar';
import CFooter from './Components/footer';

function App() {
  return (
    <div className='h-100 bg-info'>

      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/addco' element={<AddCO />} />
          <Route path='/addchapter' element={<AddSubject />} />
          <Route path='/addquestion' element={<AddQuestion />} />
          <Route path='/addblueprint' element={<AddBlueprint />} />
          <Route path='/generate' element={<GeneratePaper />} />
        </Routes>
        <CFooter />
      </Router>
    </div >
  );
}

export default App;
