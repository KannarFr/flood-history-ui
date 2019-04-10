import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import DialogActions from '@material-ui/core/DialogActions';
//import ClearIcon from '@material-ui/icons/Clear';

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    console.log(props)
  }

  render = () => {
    const { open } = this.state
    const { url, date, label, description, hideViewer } = this.props

    /*
      <DialogActions style={{ float: "right" }}>
        <ClearIcon onClick={() => hideViewer()}/>
      </DialogActions>
    */

    console.log(date)

    return (
      <Dialog
        open={open}
        onClose={() => hideViewer()}
        fullScreen={false}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          { date !== undefined ?
            date.substring(0, 10) + " - " + label :
            <span><span style={{color: "red"}}>DATE MANQUANTE</span> - {label}</span> }
        </DialogTitle>
        <DialogContent>
          <img src={url} alt={label} />
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

export default Viewer
