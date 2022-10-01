import React , { useState } from 'react';
import './App.css';
import Dropdown from './Dropdown';

function App() {
  return(
    <>
      <div className="header">
        <div>
          <div className="filter-container">
            <span>Genre:</span>
            <Dropdown/>
          </div>
          <div className="filter-container">
            <span>Sort By:</span>
            <Dropdown/>
          </div>
        </div>
        <input type="text" placeholder="Search" className="search"></input>
      </div>
    </>
  )
}

export default App;
