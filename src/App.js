import React from 'react';
import './App.css';
import seedColors from './seedColors';


import {generatePalette} from './colorHelpers';
import Palette from './Palette';

function App() {
  
  return (
    <div className="App"> 
      <Palette palette={generatePalette(seedColors[4])} />
    </div>
  );
}

export default App;
