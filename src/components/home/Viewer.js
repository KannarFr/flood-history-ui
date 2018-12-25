import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    console.log(this.props)
  }

  render = () => {
    const { open } = this.state
    const { uuid, hideViewer } = this.props

    return (
      <Dialog
        open={open}
        onClose={() => hideViewer()}
        fullScreen={true}
        aria-labelledby="responsive-dialog-title">

        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
        <DialogTitle id="responsive-dialog-title">{uuid}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )
  }
}

export default Viewer
