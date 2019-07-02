import React, { Component } from 'react';
import {withStyles} from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

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

class Palette extends Component {
  constructor(props){
    super(props);

    this.state = { level: 500, format: 'hex'};
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level){
    this.setState( {level} )
  }

  changeFormat(value){
    this.setState({format: value});
  }

  render() {
    const {colors, paletteName, emoji, id} = this.props.palette;
    const {classes} = this.props;
    const {level, format} = this.state;

    const colorBoxes = colors[level].map( color => (
      <ColorBox background={color[format]} name={color.name} key={color.id} moreURL={`/palette/${id}/${color.id}`} showLink />
    ))
    return (
      <div>
        <div className={classes.Palette}>
          <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors />
          <div className={classes.colors}>
           {colorBoxes}
          </div>
          <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Palette);