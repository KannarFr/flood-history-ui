import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Fab from '@material-ui/core/Fab';
import ClearIcon from '@material-ui/icons/Clear';

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

    return (
      <Dialog
        open={open}
        onClose={() => hideViewer()}
        fullScreen={true}
        aria-labelledby="responsive-dialog-title">

        <DialogActions>
          <Fab aria-label="Clear" onClick={() => hideViewer()}>
            <ClearIcon />
          </Fab>
        </DialogActions>
        <DialogTitle id="responsive-dialog-title">{date} - {label}</DialogTitle>
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
