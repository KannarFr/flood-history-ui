import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import Viewer2 from './Viewer2';

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
    const { resources, hideViewer } = this.props

    return (
      <Dialog
        open={open}
        onClose={() => hideViewer()}
        fullScreen={false}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <Viewer2 resources={resources}></Viewer2>
        </DialogContent>
      </Dialog>
    )
  }
}

export default Viewer
