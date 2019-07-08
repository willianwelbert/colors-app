import React, { Component } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteMetaForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      stage: 'form',
      newPaletteName: '',
    }

    this.handleChange = this.handleChange.bind( this );
    this.showEmojiPicker = this.showEmojiPicker.bind( this );
    this.savePalette = this.savePalette.bind( this );
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange(evt){
    this.setState( { [evt.target.name]: evt.target.value})
  }

  showEmojiPicker() {
    this.setState( { stage: 'emoji'})
  }

  savePalette( emoji ) {
    const newPalette =  {paletteName: this.state.newPaletteName,
      emoji: emoji.native}
    this.props.handleSubmit(newPalette)
  }

  handleClose = () => {
    this.setState( { open: false } );
    this.props.hideForm();
  };

  componentDidMount(){
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
    this.props.palettes.every( ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()  )
   );
  };


  render() {
    const { newPaletteName } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.stage === 'form'}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
          
          <ValidatorForm onSubmit={this.showEmojiPicker }>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette, make sure it is unique.
            </DialogContentText>
           
              <TextValidator 
                label='Palette Name' 
                value={this.state.newPaletteName} 
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                name='newPaletteName'
                validators={['required', 'isPaletteNameUnique' ]}
                errorMessages={['Enter Palette Name', 'Name already used']}
                />
                <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                
            

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save Palette
            </Button>
            </DialogActions>
            </ValidatorForm>
        </Dialog>
        <Dialog
          open={this.state.stage === 'emoji'}
        >
          <Picker onSelect={this.savePalette} title='Pick a palette emoji'/>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm
