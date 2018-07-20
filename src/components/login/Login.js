import React, { Component } from 'react'
import { Redirect } from 'react-router'

import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const styles = {
  textAlign: 'center',
}

const buttonStyle = {
  margin: '40px 0'
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      login: '',
      password: '',
      redirectToReferrer: false,
      errorText: ''
    }

    this.handleChangeLogin = this.handleChangeLogin.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  auth = (username, password) => {
    
  }

  handleRequestSubmit = () => {
    this.auth(this.state.login, this.state.password)
  }

  handleChangeLogin = (event) => {
    this.setState({ login: event.target.value })
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  keyPress = (event) => {
    if (event.keyCode === 13) {
      this.auth(this.state.login, this.state.password)
    }
  }

  render = () => {
    const standardActions = (
      <div style={styles}>
        <div>
          <TextField
            hintText="Your login"
            floatingLabelText="Login"
            value={this.state.login}
            onChange={this.handleChangeLogin}
            onKeyDown={this.keyPress}
            errorText={this.state.errorText} />
        </div>
        <div>
          <TextField
            hintText="Your password"
            type="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
            onKeyDown={this.keyPress}
            floatingLabelText="Password"
            errorText={this.state.errorText} />
        </div>
        <Button
          style={buttonStyle}
          label="Connection"
          primary={true}
          onTouchTap={this.handleRequestSubmit} />
      </div>
    )

    const { redirectToReferrer } = this.state

    return (
      redirectToReferrer ?
        <Redirect to='/' /> :
        <Dialog
          style={styles}
          open={this.state.open}
          modal={true}
          title="Authentication"
          actions={standardActions} />
    )
  }
}