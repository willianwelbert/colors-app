import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/styles';

import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';


const styles = {
  Palette: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  colors: {
    height: '90%'
  }
};


class SingleColorPalette extends Component {
  constructor(props){
    super(props)
    this.state = {format : 'hex'};
    this.changeFormat = this.changeFormat.bind(this);

    this._shades = this.gatherShades(this.props.palette, this.props.colorId);

  }

  changeFormat(value){
    this.setState({format: value});
  }

  gatherShades(palette, colorToFilterBy){
    let shades = [];
    let allColors = palette.colors;
    
    for (let key in allColors){
      shades = shades.concat(
        allColors[key].filter( color => color.id === colorToFilterBy  )
      );
    }
    return shades.slice(1);
  }

  render() {
    const {format} = this.state;
    const {paletteName, emoji, id} = this.props.palette;
    const {classes} = this.props;

    const colorBoxes = this._shades.map( color => (
      <ColorBox key={color.name} name={color.name} background={color[format]} showLink={false}  />
    ))
    return (
      <div className={'SingleColorPalette ' +  classes.Palette }>
      <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className="go-back ColorBox" >
            <Link to={`/palette/${id}`} className='back-button' >GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);