import React from 'react';
import {
  Route, 
  BrowserRouter as Router , 
  Routes
} from 'react-router-dom';
import {
  Nature,
  Architecture,
  Fashion
} from './refactor-this/pages'
import Navbar from './refactor-this/components/global/Navbar';
import './refactor-this/assets/css/main.css'

const App = () => {
  return (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Nature />} />
      <Route path="/architecture" element={<Architecture />} />
      <Route path="/fashion" element={<Fashion />} />
    </Routes>
  </Router>
  );
}

export default App;

