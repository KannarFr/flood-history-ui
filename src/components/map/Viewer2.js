import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, DialogActions } from '@material-ui/core';
import Button from '@material-ui/core/Button'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  root: {
    flexGrow: 1
  },
};

class Viewer2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      value: 0
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  hideZoom = () => this.setState({ open: false })

  showZoom = () => this.setState({ open: true })

  render() {
    const { resources } = this.props;
    const { value, open } = this.state;
    return (
      <>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {resources ? resources.map(resource =>
            <Tab key={resource.id} label={resource.date.substring(0, 10)} />
          ) : null}
        </Tabs>
        {value >= 0 ?
          <TabContainer>
            <h1 style={{textAlign: "center"}}>{resources[value].label}</h1>
            <div style={{textAlign: "center"}}>
            {resources[value].type.includes("video") ?
              <video controls class={"zoom"}>
                <source src={resources[value].url} type={resources[value].type} alt={resources[value].label}/>
              </video>
              : <img class={"zoom"} src={resources[value].url} alt={resources[value].label} onClick={() => this.showZoom()} />
            }
            <p>{resources[value].description}</p>
            </div>
          </TabContainer>
        : null}
        <Dialog
          open={open}
          onClose={() => this.hideZoom()}
          fullScreen={true}
          aria-labelledby="responsive-dialog-title">
          <DialogActions style={{justifyContent: "center"}}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.hideZoom()}
            >Fermer</Button>
          </DialogActions>
          <DialogTitle>
            <h3 style={{textAlign: "center", margin: 0}}>{resources[value].label}</h3>
          </DialogTitle>
          <DialogContent style={{textAlign: "center"}}>
            <img height="100%" src={resources[value].url} alt={resources[value].label} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

Viewer2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Viewer2);
