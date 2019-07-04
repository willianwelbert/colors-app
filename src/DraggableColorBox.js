import React from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';

const styles = {
  root: {
    height: '25%',
    width: '20%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4.5px',
    '&:hover svg' :{
      color: '#fff',
      transform: 'scale(1.5)'
    }
  },
  boxContent: {
    position: 'absolute',
    padding: '10px',
    width: '100%',
    left: '0px',
    bottom: '0px',
    color: '#000',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    color: 'rgba(0,0,0,0.5)',
    transition: 'all 0.3s ease-in-out!important'
  }
}

const DraggableColorBox = SortableElement((props) => {
  const {classes} = props;
  return (
    <div 
      className={classes.root} 
      style={{ backgroundColor: props.color }}
    >
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={props.handleClick} />
      </div>
         
    </div>
    );
});


export default withStyles(styles)(DraggableColorBox);