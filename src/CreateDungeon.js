import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import ChipInput from 'material-ui-chip-input'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { connect } from 'react-redux'

// import ChipPanel from './ChipPanel'
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
    maxHeight: 500,
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
  name,
}) => {
  const isDisabled = name === '' || power <= 0 || agility <= 0 || intelligence <= 0
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
                onChange={(e) => updateValue(['creatures', 0, 'name'], e.target.value)}
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
                onChange={(e) => updateValue(['creatures', 0, 'power'], e.target.value)}
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
                onChange={(e) => updateValue(['creatures', 0, 'agility'], e.target.value)}
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
                onChange={(e) => updateValue(['creatures', 0, 'intelligence'], e.target.value)}
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl>
              <ChipInput
                label="Požiadavky"
                placeholder="Zadaj požiadavky pre boj"
                value={requirements}
                onAdd={(req) =>
                  updateValue(['creatures', 0, 'requirements'], [...requirements, req])
                }
                onDelete={(chip, index) =>
                  updateValue(
                    ['creatures', 0, 'requirements'],
                    ...requirements.filter((_, i) => index !== i)
                  )
                }
              />
            </FormControl>
          </FormGroup>
        </div>

        <EntityImage
          currentImage={imageIndex !== -1 && creatureImages[imageIndex].image}
          imageClassName={classes.image}
          images={creatureImages}
          onChange={(index) => {
            if (index !== -1) updateValue(['creatures', 0, 'imageIndex'], index)
          }}
        />
      </div>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => updateValue(['page'], 'dungeon')}
        disabled={isDisabled}
      >
        {isDisabled ? 'Niektoré políčka sú neplatné!' : 'Vytvor'}
      </Button>
    </div>
  )
}

export default compose(
  connect(
    (state) => ({
      ...state.creatures[0],
    }),
    { updateValue: _updateValue }
  ),
  withStyles(styles)
)(CreateDungeon)
