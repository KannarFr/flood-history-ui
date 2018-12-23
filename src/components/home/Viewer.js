import React, { Component } from 'react';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

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
