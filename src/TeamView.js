import React from 'react'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

import IconPanel from './IconPanel'
import { mageImages, itemImages, spellImages } from './images'

import Image from './assets/races/mage/mage0.png'

const styles = (theme) => ({
  wrapper: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    width: `calc(50% - ${theme.spacing.unit}px)`,
  },
  heroDetails: {
    display: 'flex',
  },
  formPanel: {
    width: '50%',
  },
})

const TeamView = ({ classes, className }) => {
  return (
    <div className={classNames(classes.wrapper, className)}>
      <IconPanel data={mageImages} />
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
          <IconPanel data={spellImages} />
        </div>
        <img src={Image} width="50%" height="50%" />
      </div>
      <IconPanel data={itemImages} />
    </div>
  )
}

export default withStyles(styles)(TeamView)
