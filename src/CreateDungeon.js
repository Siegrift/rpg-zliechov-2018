import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'

import ChipPanel from './ChipPanel'
import EntityImage from './EntityImage'
import { updateValue as _updateValue } from './actions'
import { creatureImages } from './images'

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

const CreateDungeon = ({
  classes,
  power,
  agility,
  intelligence,
  imageIndex,
  updateValue,
  requirements,
  currentRequirement,
  setCurrentRequirement,
  name,
}) => {
  return (
    <div className={classes.panel}>
      <Typography className={classes.title} component="h2" variant="h1">
        Vytvor dungeon
      </Typography>
      <div className={classes.formWrapper}>
        <div className={classes.form}>
          <FormGroup>
            <FormControl>
              <TextField
                label="Názov"
                placeholder="Zadaj názov príšery"
                value={name}
                onChange={(e) => updateValue(['creature', 'name'], e.target.value)}
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl>
              <TextField
                type="number"
                label="Sila"
                placeholder="Zadaj silu príšery"
                value={power}
                onChange={(e) => updateValue(['creature', 'power'], e.target.value)}
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl>
              <TextField
                type="number"
                label="Obratnosť"
                placeholder="Zadaj obratnosť príšery"
                value={agility}
                onChange={(e) => updateValue(['creature', 'agility'], e.target.value)}
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl>
              <TextField
                type="number"
                label="Inteligencia"
                placeholder="Zadaj inteligenciu príšery"
                value={intelligence}
                onChange={(e) => updateValue(['creature', 'intelligence'], e.target.value)}
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl>
              <TextField
                label="Požiadavky"
                placeholder="Zadaj Požiadavku pre boj"
                value={currentRequirement}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateValue(['creature', 'requirements'], [...requirements, currentRequirement])
                    setCurrentRequirement('')
                  }
                }}
                onChange={(e) => {
                  setCurrentRequirement(e.target.value)
                }}
              />
            </FormControl>
          </FormGroup>
          <ChipPanel
            chips={requirements}
            onDelete={(index) =>
              updateValue(
                ['creature', 'requirements'],
                requirements.filter((_, ind) => ind !== index)
              )
            }
          />
        </div>
        <EntityImage
          currentImage={imageIndex !== -1 && creatureImages[imageIndex].image}
          imageClassName={classes.image}
          images={creatureImages}
          onChange={(index) => {
            if (index !== -1) updateValue(['creature', 'imageIndex'], index)
          }}
        />
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => updateValue(['page'], 'dungeon')}
      >
        Vytvor
      </Button>
    </div>
  )
}

export default compose(
  connect(
    (state) => ({
      ...state.creature,
    }),
    { updateValue: _updateValue }
  ),
  withState('currentRequirement', 'setCurrentRequirement', ''),
  withStyles(styles)
)(CreateDungeon)
