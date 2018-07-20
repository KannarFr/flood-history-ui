import React, { Component } from 'react';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export default class Viewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }
  
  render = () => {
    const { resource } = this.props
    const date = new Date(resource.creation_date * 1000)
    return (
      <Dialog
        open={this.state.open}
        onClose={this.props.hideViewer}
        fullScreen={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{date.toString()}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <img alt={resource.path} src={resource.path} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.hideViewer} color="primary" autoFocus>
            Ok!
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}