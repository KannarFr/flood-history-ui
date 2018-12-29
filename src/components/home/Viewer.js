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
      open: true,
      url: null
    }
    console.log(this.props)
  }

  componentWillMount = () => {
    fetch('http://localhost:9000/resources/' + this.props.uuid + '/file', {
      method: 'GET'
    }).then(res => {
      return res.json()
    }).then(file => {
      this.setState({
        url: file.url
      })
    })
  }

  render = () => {
    const { open, url } = this.state
    const { uuid, date, label, hideViewer } = this.props

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
        <DialogTitle id="responsive-dialog-title">{uuid} - {date}</DialogTitle>
        <DialogContent>
          <img src={url} alt={label} />
        </DialogContent>
      </Dialog>
    )
  }
}

export default Viewer
