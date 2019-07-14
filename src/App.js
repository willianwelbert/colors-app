import React, {Component} from 'react';
import {Route, Switch} from'react-router-dom';

import './App.css';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';


import {generatePalette} from './colorHelpers';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';

class App extends Component {
  constructor(props){
    super(props);
    const cachedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {palettes: cachedPalettes || seedColors}
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
  }

  findPalette(id){
    return this.state.palettes.find( palette => (palette.id === id) )
  }

  deletePalette(id){
    this.setState( prevState => {
      return { palettes: prevState.palettes.filter(palette => palette.id !== id)}
    }, this.syncLocalStorage )
  }

  savePalette(newPalette){
    this.setState( {palettes: [...this.state.palettes, newPalette]} , this.syncLocalStorage)
  }

  syncLocalStorage(){
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render(){
  return (
    
    <Switch>
      <Route exact path='/palette/new' render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps} palettes={this.state.palettes} /> } />
      <Route exact path='/' render={ routeProps => <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} {...routeProps} /> } />
      <Route exact path='/palette/:id' render={ routeProps => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} /> } />
      <Route exact  path='/palette/:paletteId/:colorId' render={ routeProps => <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId} /> } />

    </Switch>

  );
  }
}

export default App;
