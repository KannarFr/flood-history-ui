import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom'
import Spinner from 'react-spinner'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

// components
import Login from './components/login/Login'
import Home from './components/home/Home'
import HowItWorks from './components/howitworks/HowItWorks'
import Upload from './components/upload/Upload'

// styles
const navItemStyle = {
  color: 'inherit',
  textDecoration: 'none',
  display: 'block',
  padding: '0',
  margin: '0',
  width: '100%',
  height: '100%'
}

const Header = ({ title, handleToggleMenu, logout, token }, props) => (
  <>
    {token ?
      <AppBar style={{position: "static"}}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={() => handleToggleMenu()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            { title }
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar> :
      <AppBar style={{position: "static"}}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={() => handleToggleMenu()}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            { title }
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    }
  </>
)

const Sidebar = ({ routes, open, handleToggleMenu }, props) => (
  <>
    <Drawer open={open} docked={"false"} onClick={() => handleToggleMenu()}>
      <img src={'/img/logo.jpeg'} className="logo" alt="logo" />
      {routes ?
        routes.map((route, index) =>
          route.isMenu ?
            <MenuItem key={index} onClick={() => handleToggleMenu()} style={{ margin: 0, padding: 0}}>
              <Link style={navItemStyle} to={`${route.path}`}>{route.label || '[no label]'}</Link>
            </MenuItem> : null
        )
        : <div>Loading...</div>
      }
    </Drawer>
  </>
)

// routing
const PrivateRoute = ({ component: Component, token, ...rest }) =>
  <Route {...rest} render={props =>
    token ? <Component token={token} {...props} /> : <Redirect from='*' to='/login' />
  } />

const PublicRoute = ({ component: Component, login, ...rest }) =>
  <Route {...rest} render={props => (<Component login={login} {...props} />)} />

const Main = ({ routes, token }, props) =>
  <Switch>
    {routes.map((route, index) =>
      route.isPublic ?
        <PublicRoute key={index} path={route.path} exact={route.exact} component={route.component} />
        : <PrivateRoute key={index} path={route.path} exact={route.exact} component={route.component} token={token} />
    )}
  </Switch>

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routes: null,
      open: false,
      token: null
    }
  }

  componentWillMount = () => {
    const routes = [
      { isMenu: true, isPublic: true, label: 'Map', exact: true, path: '/', component: Home },
      { isMenu: true, isPublic: true, label: 'HowItWorks', exact: true, path: '/howitworks', component: HowItWorks },
      { isMenu: true, isPublic: true, label: 'Upload', exact: true, path: '/upload', component: Upload },
      { isMenu: false, isPublic: true, label: 'Connection', path: '/login', component: Login }
    ]

    const token = sessionStorage.getItem('token')
    this.setState({ routes, token })
  }

  login = (token) => {
    this.setState({ token })
  }

  logout = () => {
    sessionStorage.clear()
    this.setState({ token: null })
  }
  
  handleToggleMenu = () => this.setState({ open: !this.state.open })

  render = () => {
    const { routes, token, open } = this.state

    return (
      token === undefined ?
        <Spinner /> :
        <Router>
          <>
            <Header title="SMBVAS" handleToggleMenu={this.handleToggleMenu} logout={this.logout} token={token} />
            <Sidebar routes={routes} open={open} handleToggleMenu={this.handleToggleMenu} />
            <Main routes={routes} token={token} />
          </>
        </Router>
    )
  }
}