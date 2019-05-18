import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { resources } = this.props;
    const { value } = this.state;

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
            <img src={resources[value].url} alt={resources[value].label} />
            {resources[value].description}
          </TabContainer>
        : null}
      </>
    );
  }
}

Viewer2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Viewer2);
