import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import EntityImage from './EntityImage'

const styles = (theme) => ({
  panel: {
    margin: theme.spacing.unit,
  },
  title: {
    textAlign: 'center',
  },
  formWrapper: {
    marginTop: theme.spacing.unit,
    display: 'flex',
    '& > div': {
      width: '50%',
      margin: 'auto',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  form: {
    '& > *': {
      margin: theme.spacing.unit / 2,
    },
  },
  image: {
    maxHeight: '500px',
    margin: 'auto',
    maxWidth: '80%',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    margin: 'auto',
    display: 'block',
  },
})

const CreateDungeon = ({ classes }) => {
  return (
    <div className={classes.panel}>
      <Typography className={classes.title} component="h2" variant="h1">
        Vytvor dungeon
      </Typography>
      <div className={classes.formWrapper}>
        <div className={classes.form}>
          <FormGroup>
            <FormControl>
              <TextField label="Sila" placeholder="Zadaj silu príšery" />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField label="Obratnosť" placeholder="Zadaj obratnosť príšery" />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField label="Inteligencia" placeholder="Zadaj inteligenciu príšery" />
            </FormControl>
          </FormGroup>
        </div>
        <EntityImage imageClassName={classes.image} />
      </div>
      <Button className={classes.button} variant="contained" color="primary" size="large">
        Vytvor
      </Button>
    </div>
  )
}

export default withStyles(styles)(CreateDungeon)
