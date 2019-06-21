import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css'


class Palette extends Component {
  render() {
    
    const colorBoxes = this.props.colors.map( color => (
      <ColorBox background={color.color} name={color.name} />
    ))
    return (
      <div>
        <div className='Palette'>
        {/*Navbar goes here*/}
          <div className='Palette-colors'>
           {/*bunch of color boxes*/}
           {colorBoxes}
          </div>
          {/*footer*/}
        </div>
      </div>
    );
  }
}

export default Palette;