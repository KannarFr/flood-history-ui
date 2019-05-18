import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle } from '@material-ui/core';

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
          variant=""
          indicatorColor="secondary"
          textColor="secondary"
        >
          {resources ? resources.map(resource =>
            <Tab key={resource.id} label={resource.date.substring(0, 10)} />
          ) : null}
        </Tabs>
        {value >= 0 ?
          <TabContainer>
            <h1 style={{textAlign: "center"}}>{resources[value].label}</h1>
            <img class={"zoom"} src={resources[value].url} alt={resources[value].label} onClick={() => this.showZoom()} />
            {resources[value].description}
          </TabContainer>
        : null}
        <Dialog
          open={open}
          onClose={() => this.hideZoom()}
          fullScreen={true}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle><h2 style={{textAlign: "center"}}>Echap pour quitter</h2></DialogTitle>
          <DialogContent>
            <img width="80%" src={resources[value].url} alt={resources[value].label} />
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
