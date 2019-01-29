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
    marginRight: theme.spacing.unit,
  }
})

function getSteps() {
  return [
    'Informations sur la resource à envoyer',
    'Fichier'
  ]
}

function getStepContent(step, classes, handleChange, resourceDate) {
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
            onChange={(e) => handleChange('label', e.target.value)}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            fullWidth
            margin="normal"
            variant="outlined"
            helperText="N'hésitez pas à renseigner la description. S'il manque des informations dans les autre champs, nous allons peut-être pouvoir les ajouter de notre côté."
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <Grid container justify="flex-start">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
              <DatePicker
                disableFuture={true}
                margin="normal"
                label="Date"
                onChange={(date) => handleChange('date', date)}
                value={resourceDate}
                variant="outlined"
                className={classes.textField}
                format="dd/MM/yyyy"
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              />
            </MuiPickersUtilsProvider>
            <TextField
              id="latitude"
              label="Latitude"
              type="number"
              margin="normal"
              variant="outlined"
              className={classes.textField}
              onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
            />
            <TextField
              id="longitude"
              label="Longitude"
              type="number"
              margin="normal"
              variant="outlined"
              onChange={(e) => handleChange('longitude', parseFloat(e.target.value))}
            />
          </Grid>
          <TextField
            id="providerContact"
            label="Adresse email ou téléphone"
            placeholder="monadresse@email.fr ou 06 33 44 55 66"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={(e) => handleChange('providerContact', e.target.value)}
          />
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
    error: undefined,
    activeStep: 0,
    currentResource: undefined
  }

  createResourceFromForm = () => {
    let resourceToCreate = {
      'label': this.state.label,
      'description': this.state.description,
      'date': this.state.date,
      'lat': this.state.latitude,
      'lng': this.state.longitude,
      'providerContact': this.state.providerContact
    }

    fetch('http://localhost:9000/resources', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify(resourceToCreate)
    })
    .then(response => {
      if (response.status >= 200 && response.status <= 299) {
        this.setState(
          { currentResource: response.json(), error: null },
           this.handleNext()
        )
      } else this.setState({ error: response.statusText })
    })
  }

  uploadFileForResource = (resource) => () => {
    fetch('http://localhost:9000/resources/' + resource.id + '/upload', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrer: "no-referrer",
      body: JSON.stringify("lol")
    })
    .then(response => {
      console.log(response.json())
    })
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

  handleChange = (key, value) => {
    this.setState({ [key]: value })
  }

  render = () => {
    const { classes } = this.props
    const steps = getSteps()
    const { error, activeStep, resourceDate, currentResource } = this.state
    console.log("yooo")
    console.log(currentResource)

    return (
      <div className={classes.root}>
        { error }
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index, classes, this.handleChange, resourceDate)}
                  <div className={classes.actionsContainer}>
                    <div>
                    {activeStep === steps.length - 1 ?
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.uploadFileForResource(currentResource)}
                        className={classes.button}
                      >Envoyer</Button>
                      :
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.createResourceFromForm}
                        className={classes.button}
                      >Suivant</Button>
                    }
                    </div>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Votre marqueur a été envoyé pour vérification/validation. Il fois validé il apparaitra sur la carte.</Typography>
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
