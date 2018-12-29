import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers'

import frLocale from 'date-fns/locale/fr';

const styles = theme => ({
  root: {
    //width: '90%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
})

function getSteps() {
  return [
    'Informations',
    'Fichier'
  ]
}

function getStepContent(step, classes, handleDateChange, resourceDate) {
  switch (step) {
    case 0:
      return (
        <>
          <TextField
            required
            id="label"
            label="Lieu"
            placeholder="213 Ancienne route de Villers, 74340, Villers-Ecalles"
            margin="normal"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="description"
            label="Description"
            multiline
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Grid container justify="flex-start">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
              <DatePicker
                disableFuture={true}
                margin="normal"
                label="Date"
                onChange={handleDateChange}
                value={resourceDate}
                variant="outlined"
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="outlined-number"
              label="Latitude"
              //onChange={this.handleChange('age')}
              type="number"
              margin="normal"
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-number"
              label="Longitude"
              //onChange={this.handleChange('age')}
              type="number"
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </>
      )
    case 1:
      return 'blabla'
    default:
      return 'Unknown step'
  }
}


class Upload extends Component {
  state = {
    activeStep: 0,
    description: '',
    resourceDate: new Date()
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  handleDateChange = date => {
    this.setState({ resourceDate: date })
  }

  render = () => {
    const { classes } = this.props
    const steps = getSteps()
    const { activeStep, resourceDate } = this.state

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index, classes, this.handleDateChange, resourceDate)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Envoyer!' : 'Suivant'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Votre marqueur a été envoyé pour validation. Il fois validé il apparaitra sur la carte.</Typography>
          </Paper>
        )}
      </div>
    )
  }
}

Upload.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(Upload)
