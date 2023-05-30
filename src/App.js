import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import { BrowserRouter as Router,Routes,Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
      <div style={{overflow:'hidden', backgroundColor:'white'}}>
        <Router>
          <Navbar/>
          {/* <Banner/> */}
          <Routes>
            <Route path='/' element={
              <>
                 <Banner />
                 <Movies />
              </>
            }/>
            <Route path='/favourites' element={<Favourite/>}/>
          </Routes>
          {/* <Favourite/> */}
          {/* <Movies/> */}
        </Router>
      </div>
  );
}

export default App;