import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, DialogActions, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'

class EditableViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    console.log(props)
  }

  validate = (id) => {
    var headers = new Headers();
    headers.append("X-Token", sessionStorage.getItem("token"));
    headers.append("Content-Type", "application/json")

    fetch(process.env.REACT_APP_SMBVAS_API_URL + 'resources/' + id + '/validate', {
      method: 'PATCH',
      headers: headers
    }).then(res => {
      this.props.hideViewer();
    });
  }

  unvalidate = (id) => {
    var headers = new Headers();
    headers.append("X-Token", sessionStorage.getItem("token"));
    headers.append("Content-Type", "application/json")

    fetch(process.env.REACT_APP_SMBVAS_API_URL + 'resources/' + id + '/unvalidate', {
      method: 'PATCH',
      headers: headers
    }).then(res => {
      this.props.hideViewer();
    });
  }

  render = () => {
    const { open } = this.state
    const { id, label, type, url, lat, lng, date, providerContact, providerFirstName, providerLastName, status, hideViewer } = this.props

    return (
      <Dialog
        open={open}
        onClose={() => hideViewer()}
        fullScreen={false}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle>
          <Typography style={{textAlign: "left", margin: 0, fontFamily: "Courier New"}}>Identifiant : {id}</Typography>
          <Typography style={{textAlign: "left", margin: 0, fontFamily: "Courier New"}}>Statut : {status}</Typography>
          <Typography style={{textAlign: "left", margin: 0}}>Etiquette : {label}</Typography>
          <Typography style={{textAlign: "left", margin: 0}}>Date : {date}</Typography>
          <Typography style={{textAlign: "left", margin: 0}}>Latitude : {lat}</Typography>
          <Typography style={{textAlign: "left", margin: 0}}>Longitude : {lng}</Typography>
          <Typography style={{textAlign: "left", margin: 0}}>Contact : {providerContact}</Typography>
          <Typography style={{textAlign: "left", margin: 0}}>Prénom : {providerFirstName}</Typography>
          <Typography style={{textAlign: "left", margin: 0}}>Nom : {providerLastName}</Typography>
        </DialogTitle>
        <DialogContent style={{textAlign: "right"}}>
          {type.includes("video") ?
            <video controls class={"zoom"}>
              <source src={url} type={type} alt={label}/>
            </video>
            : <img  height="100%" src={url} alt={label} />
          }
        </DialogContent>
        <DialogActions>
          { status !== "VALIDATED" ?
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "green "}}
              onClick={() => this.validate(id)}
            >Valider</Button>
            : <Button
              style={{ backgroundColor: "red "}}
              variant="contained"
              color="primary"
              onClick={() => this.unvalidate(id)}
            >Invalider</Button>
          }
        </DialogActions>
      </Dialog>
    )
  }
}

export default EditableViewer
