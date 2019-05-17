import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
      open: true,
      value: 0
    }
    console.log(props)
  }

  handleChange = (event, value) => {
    console.log(value)
    this.setState({ value });
  };

  render() {
    const { classes, resources } = this.props;
    const { value } = this.state;
    console.log(resources[value])

    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          {resources ? resources.map(resource =>
            <Tab key={resource.id} label={resource.date.substring(0, 10)} />
          ) : null}
        </Tabs>
        {value >= 0 ?
          <TabContainer>
            <h1>{ resources[value].date !== undefined ?
            resources[value].date.substring(0, 10) + " - " + resources[value].label :
            <span><span style={{color: "red"}}>DATE MANQUANTE</span> - {resources[value].label}</span>}</h1>
            <img src={resources[value].url} alt={resources[value].label} />
            {resources[value].description}
          </TabContainer>
        : null}
      </Paper>

    );
  }
}

Viewer2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Viewer2);
