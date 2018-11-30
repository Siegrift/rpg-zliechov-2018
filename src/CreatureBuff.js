import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { pick, map } from 'lodash'

import { updateValue as _updateValue } from './actions'
import { creatureImages } from './units'
import { creatureSpells } from './spells'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const displayNameMapping = {
  name: 'Meno',
  power: 'Sila',
  agi: 'Obratnosť',
  int: 'Inteligencia',
}

const styles = (theme) => ({
  root: {
    zIndex: 100000,
  },
  media: {
    objectFit: 'contain',
    width: '100%',
    maxHeight: '400px',
    [theme.breakpoints.down('lg')]: {
      maxHeight: 300,
    },
  },
  spellWrapper: {
    display: 'flex',
    height: 80,
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: theme.spacing.unit / 2,
  },
  centerText: {
    textAlign: 'center',
  },
})

const CreateBuff = ({ classes, updateValue, creature }) => {
  const { imageIndex, name, spellIndexes } = creature
  return (
    <Dialog
      open
      aria-labelledby="form-dialog-title"
      classes={{ root: classes.root }}
      disableEscapeKeyDown
      disableBackdropClick
      TransitionComponent={Transition}
      scroll="paper"
    >
      <DialogTitle id="form-dialog-title">Whoops!</DialogTitle>
      <DialogContent>
        <img
          alt="Príšera"
          className={classes.media}
          src={creatureImages[imageIndex].image}
          title={name}
        />

        {map(pick(creature, ['name', 'power', 'agi', 'int']), (text, key) => (
          <DialogContentText key={key} className={classes.centerText}>
            {displayNameMapping[key]} - <b>{text}</b>
          </DialogContentText>
        ))}

        {spellIndexes.map((index, i) => {
          return (
            <div key={i} className={classes.spellWrapper}>
              <img
                src={creatureSpells[index].image}
                alt={creatureSpells[index].title}
                className={classes.image}
              />
              <DialogContentText>{creatureSpells[index].desc}</DialogContentText>
            </div>
          )
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => updateValue(['page'], 'fight')} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default compose(
  connect(
    (state) => ({
      creature: state.creatures[0],
    }),
    { updateValue: _updateValue }
  ),
  withStyles(styles)
)(CreateBuff)
