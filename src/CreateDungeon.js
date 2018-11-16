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
import { creatureImages } from './units'

const styles = (theme) => ({
  panel: {
    margin: theme.spacing.unit,
  },
  title: {
    textAlign: 'center',
  },
  formWrapper: {
    marginTop: 150,
    display: 'flex',
    '& > div': {
      width: '50%',
      margin: 'auto',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing.unit,
    },
  },
  form: {
    '& > *': {
      margin: theme.spacing.unit / 2,
    },
  },
  image: {
    maxHeight: 600,
    margin: 'auto',
    maxWidth: '80%',
    [theme.breakpoints.down('lg')]: {
      maxHeight: 400,
    },
  },
  buttonWrapper: {
    display: 'flex',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.down('lg')]: {
      marginTop: theme.spacing.unit,
    },
  },
  button: {
    flex: 1,
    display: 'block',
  },
})

const CreateDungeon = ({
  classes,
  power,
  agi,
  int,
  imageIndex,
  updateValue,
  requirements,
  name,
}) => {
  const isDisabled = name === '' || power <= 0 || agi <= 0 || int <= 0
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
                value={agi}
                onChange={(e) => updateValue(['creatures', 0, 'agi'], e.target.value)}
              />
            </FormControl>
          </FormGroup>

          <FormGroup>
            <FormControl>
              <TextField
                type="number"
                label="Inteligencia"
                placeholder="Zadaj inteligenciu príšery"
                value={int}
                onChange={(e) => updateValue(['creatures', 0, 'int'], e.target.value)}
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
      <div className={classes.buttonWrapper}>
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
