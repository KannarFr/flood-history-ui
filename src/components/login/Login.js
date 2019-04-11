import React, { Component } from 'react'
import { Redirect } from 'react-router'

import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { DialogTitle, DialogContent, Typography } from '@material-ui/core';

import sha512 from 'js-sha512';

const styles = {
  textAlign: 'center',
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      email: '',
      password: '',
      statusLogin: undefined,
      token: sessionStorage.getItem("token")
    }
  }

  auth = (email, password) => {
    let userToAuthenticate = {
      "email": email,
      "password": sha512(password)
    }

    fetch(process.env.REACT_APP_SMBVAS_API_URL + 'users/authenticate', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(userToAuthenticate)
    })
    .then((response) => {
      this.setState({ statusLogin: response.status })
      return response.json()
    }).then((token) => {
      this.setState({
          token: token.value
        },
        this.props.login(token.value)
      )
    })
  }

  handleRequestSubmit = () => {
    this.auth(this.state.email, this.state.password)
  }

  handleChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render = () => {
    const { token, statusLogin } = this.state

    return (
      token ?
        <Redirect to='/' /> :
        <Dialog
          style={styles}
          open={this.state.open}
          fullScreen={false}>
          <DialogTitle>Manager</DialogTitle>
          <DialogContent>
            <div>
              <div>
                { (statusLogin >= 299) ? <Typography style={{ color: "red" }}>Mauvais identifiants</Typography> : "" }
                <TextField
                  style={{ marginTop: "20px" }}
                  label="Email"
                  placeholder="jean.dupont@mail.fr"
                  value={this.state.login}
                  onChange={(e) => this.handleChange('email', e.target.value)}
                  variant="outlined" />
              </div>
              <div>
                <TextField
                  style={{ marginTop: "20px", marginBottom: "40px" }}
                  placeholder="Mot de passe"
                  label="Mot de passe"
                  type="password"
                  value={this.state.password}
                  variant="outlined"
                  onChange={(e) => this.handleChange('password', e.target.value)} />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleRequestSubmit}>Connexion</Button>
            </div>
          </DialogContent>
        </Dialog>
    )
  }
}