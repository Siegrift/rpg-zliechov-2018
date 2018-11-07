import React from 'react'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

import IconPanel from './IconPanel'

import Image from './assets/races/mage/mage0.png'

const styles = (theme) => ({
  heroDetails: {
    display: 'flex',
  },
  formPanel: {
    width: '50%',
  },
})

const TeamView = ({ classes }) => {
  return (
    <div style={{ maxWidth: '50%' }}>
      <IconPanel />
      <div className={classes.heroDetails}>
        <div className={classes.formPanel}>
          <FormGroup>
            <FormControl>
              <TextField label="Sila" value={Math.ceil(Math.random() * 1000)} />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField label="Obratnosť" value={Math.ceil(Math.random() * 1000)} />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField label="Inteligencia" value={Math.ceil(Math.random() * 1000)} />
            </FormControl>
          </FormGroup>
          <IconPanel />
        </div>
        <img src={Image} width="50%" height="50%" />
      </div>
      <IconPanel />
    </div>
  )
}

export default withStyles(styles)(TeamView)
