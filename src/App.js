import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Redirect, Switch } from 'react-router-dom'
import Spinner from 'react-spinner'

import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'

// components
import Login from './components/login/Login'
import FloodHistoryMap from './components/map/FloodHistoryMap'
import HowItWorks from './components/howitworks/HowItWorks'
import Upload from './components/upload/Upload'
import LegalNotices from './components/legalnotices/LegalNotices'
import Credits from './components/credits/Credits'
import Contact from './components/contact/Contact'
import Manager from './components/manager/Manager'

// styles
const navItemStyle = {
  color: 'inherit',
  textDecoration: 'none',
  display: 'inline-block',
  padding: '16px',
  margin: '0',
  width: '100%',
  height: '100%'
}

const Header = ({ title, handleToggleMenu, logout, token }, props) => (
  <AppBar style={{position: "static"}}>
    <Toolbar>
      <IconButton style={{ marginLeft: -12, marginRight: 20 }} color="inherit" aria-label="Menu" onClick={() => handleToggleMenu()}>
        <MenuIcon />
      </IconButton>
      <Link style={{ color: "white", textDecoration: "none"}} to={"/"}>
        <Typography variant="title" color="inherit">
          { title }
        </Typography>
      </Link>
      <Link style={{ marginLeft: "auto", color: "white"}} to={"/manage"}></Link>
      {token ?
        <IconButton style={{ marginLeft: "auto" }} color="inherit" aria-label="Menu">
          <CloseIcon />
        </IconButton>
        :
        <Link style={{ marginLeft: "auto", color: "white"}} to={"/manage"}>
          <IconButton style={{ marginLeft: "auto" }} color="inherit" aria-label="Menu">
            <SettingsIcon />
          </IconButton>
        </Link>
      }
    </Toolbar>
  </AppBar>
)

const Sidebar = ({ routes, open, handleToggleMenu }, props) => (
  <>
    <Drawer achor={"top"} open={open} docked={"false"} onClick={() => handleToggleMenu()}>
      <img src={'/img/logo.webp'} width="270px" className="logo" alt="logo" style={{marginBottom: "50px", marginTop: "10px" }} />
      <div>
        {routes ?
          routes.map((route, index) =>
            route.isMenu ?
            <MenuItem key={index} onClick={() => handleToggleMenu()} style={{ display: "block", padding: 0, height: "auto" }}>
              <Link style={navItemStyle} to={`${route.path}`}>{route.label || '[no label]'}</Link>
            </MenuItem> : null
          )
          : <div>Chargement...</div>
        }
      </div>
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
      { isMenu: true, isPublic: true, label: 'Carte', exact: true, path: '/', component: FloodHistoryMap },
      { isMenu: true, isPublic: true, label: "Qu'est ce que c'est ?", exact: true, path: '/howitworks', component: HowItWorks },
      { isMenu: true, isPublic: true, label: 'Participer à la photothèque', exact: true, path: '/upload', component: Upload },
      { isMenu: true, isPublic: true, label: 'Contact', exact: true, path: '/contact', component: Contact },
      { isMenu: true, isPublic: true, label: 'Mentions légales', exact: true, path: '/legal-notices', component: LegalNotices },
      { isMenu: true, isPublic: true, label: 'Crédits', exact: true, path: '/credits', component: Credits },
      { isMenu: false, isPublic: true, label: 'Connexion', path: '/login', component: Login },
      { isMenu: false, isPublic: true, label: 'Manager', path: '/manage', component: Manager }
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
            <Header title="Les inondations de l'Austreberthe" handleToggleMenu={this.handleToggleMenu} logout={this.logout} token={token} />
            <Sidebar routes={routes} open={open} handleToggleMenu={this.handleToggleMenu} />
            <Main routes={routes} token={token} />
          </>
        </Router>
    )
  }
}