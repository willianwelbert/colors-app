import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import {withStyles } from '@material-ui/styles';
import Sizes from './Sizes';

import './ColorBox.css';

import {CopyToClipboard} from 'react-copy-to-clipboard';

const styles = {
  copyText:{
    color: props => chroma(props.background).luminance() >= 0.7 ? '#000' : '#fff'
  },
  colorName: {
    color: props => chroma(props.background).luminance() <= 0.08 ? '#fff' : '#000'
  }
}

class ColorBox extends Component {
  constructor(props){
    super(props);
    this.state = {copied: false};
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState(){
    this.setState({copied: true}, () => {setTimeout( () => this.setState({copied: false}),1500 )})
  }

  render() {
    const{name, background, moreURL, showLink, classes} = this.props;
    const {copied} = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
      <div style={{background}} className='ColorBox'>
        <div style={{background}} className={`copy-overlay ${copied && 'show'}`} ></div>
        <div className={`copy-msg ${copied && 'show'}`}>
          <h1>copied!</h1>
          <p className={classes.copyText} >{background}</p>
        </div>
        <div className='copy-container'>
          <div className='box-content'>
            <span className={classes.colorName} >{name}</span>
          </div>
          <button className={`copy-button ${classes.copyText}`}>Copy</button>
        </div>
        {showLink && (
        <Link to={moreURL} onClick={ e => e.stopPropagation() }>
          <span className={`see-more ${classes.copyText}`} >MORE</span>
        </Link>
        )}
      </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
