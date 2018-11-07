import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import PlaceholderCreature from './assets/creatures/creaturePlaceholder.png'

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
  imageWrapper: {
    display: 'grid',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    borderRadius: theme.spacing.unit / 2,
    cursor: 'pointer',
  },
  image: {
    maxHeight: '500px',
    margin: 'auto',
    maxWidth: '50%',
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
        <div>
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
        <Tooltip title="Vyber obrázok">
          <div className={classes.imageWrapper}>
            <img src={PlaceholderCreature} alt="Placeholder creature" className={classes.image} />
          </div>
        </Tooltip>
      </div>
      <Button className={classes.button} variant="contained" color="primary" size="large">
        Vytvor
      </Button>
    </div>
  )
}

export default withStyles(styles)(CreateDungeon)
