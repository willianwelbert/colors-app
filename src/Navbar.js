import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



import './Navbar.css'

class Navbar extends Component {
  constructor(props){
    super(props);

    this.state = {format: 'hex', open: false};
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  closeSnackbar(){
    this.setState({open: false})
  }

  handleFormatChange(evt){
    this.setState( {format: evt.target.value, open: true} );
    this.props.handleChange(evt.target.value);

  }
  render() {
    const {level, changeLevel} = this.props;
    const {format} = this.state;
    return (
      <header className='Navbar'>
        <div className='logo'>
          <Link to='/'>reactcolorpicker</Link>
        </div>

        <div className='slider-container'>
          <span>Level: {level}</span>
          <div className='slider'>
            <Slider defatulValue={level} min={100} max={900} onAfterChange={changeLevel} step={100}  />
          </div>
        </div>

        <div className='select-container'>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>

        <SnackBar anchorOrigin={{vertical: 'bottom', horizontal:'left'}} open={this.state.open} autoHideDuration={3000} message={<span id="message-id">Format Changed to {format.toUpperCase()} !</span>} ContentProps={{"aria-describedby" : 'message-id'}} 
          action={[
            <IconButton onClick={this.closeSnackbar} color='inherit' key='close' aria-label='close'>
              <CloseIcon/>
            </IconButton>]} 
          onClose={this.closeSnackbar}
         />
      </header>
    );
  }
}

export default Navbar;

