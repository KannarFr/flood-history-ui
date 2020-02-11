import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

import EditableViewer from './EditableViewer';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'title', numeric: false, disablePadding: false, label: 'Titre' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Statut' },
  { id: 'creation_date', numeric: false, disablePadding: false, label: 'Créée le' },
  { id: 'edition_date', numeric: false, disablePadding: false, label: 'Editée le' },
];

class ManagerHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

ManagerHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    width: 'auto',
    padding: theme.spacing.unit * 3,
    boxShadow: 'none'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Manager extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'creation_date',
    resources: [],
    resourceToShow: null
  };

  componentWillMount = () => {
    var authHeader = new Headers();
    authHeader.append("X-Token", sessionStorage.getItem("token"));

    fetch(process.env.REACT_APP_SMBVAS_API_URL + 'resources', {
      method: 'GET',
      headers: authHeader
    }).then(res => {
      return res.json()
    }).then(resources => {
      this.setState({
        resources: resources,
      })
    })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleViewerClick = (resource) => this.setState({ resourceToShow: resource })
  hideViewer = () => this.setState({ resourceToShow: null })

  render() {
    const { classes } = this.props;
    const { resources, order, orderBy, resourceToShow } = this.state;

    return (
      <>
        {resourceToShow ? <EditableViewer hideViewer={this.hideViewer} {...resourceToShow} /> : null}
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <ManagerHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={resources.length}
              />
              <TableBody>
                {resources.sort((a, b) => a.creationDate < b.creationDate)
                  .map(n => {
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleViewerClick(n)}
                        tabIndex={-1}
                        key={n.id}
                      >
                        <TableCell style={{fontFamily: "Courier New", padding: 0}}>{n.id}</TableCell>
                        <TableCell>{n.label}</TableCell>
                        <TableCell>{n.type}</TableCell>
                        <TableCell>{n.status}</TableCell>
                        <TableCell>{new Intl.DateTimeFormat('fr-FR').format(Date.parse(n.creationDate.substring(0, n.creationDate.length - 5)))}</TableCell>
                        {n.editionDate ?
                          <TableCell>{new Intl.DateTimeFormat('fr-FR').format(Date.parse(n.editionDate.substring(0, n.editionDate.length - 5)))}</TableCell> : <TableCell>-</TableCell>
                        }
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </>
    );
  }
}

Manager.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Manager);
