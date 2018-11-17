import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withState, compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'

import ImagePanel from './ImagePanel'

const styles = {
  root: {
    zIndex: 100000,
  },
  imagePanel: {
    justifyContent: 'center',
  },
  int: {
    backgroundColor: 'rgb(0, 0, 220)',
    '&:hover': {
      backgroundColor: 'rgb(0, 0, 150)',
    },
  },
  agi: {
    backgroundColor: 'rgb(0, 220, 0)',
    '&:hover': {
      backgroundColor: 'rgb(0, 150, 0)',
    },
  },
  power: {
    backgroundColor: 'rgb(220, 0, 0)',
    '&:hover': {
      backgroundColor: 'rgb(150, 0, 0)',
    },
  },
}

const ImageDialog = ({ classes, onClose, images, index, setIndex, attribute, setAttribute }) => {
  return (
    <Dialog
      open
      onClose={() => onClose(index)}
      aria-labelledby="form-dialog-title"
      classes={{ root: classes.root }}
      disableEscapeKeyDown
      disableBackdropClick
    >
      <DialogTitle id="form-dialog-title">Vyber obrázok</DialogTitle>
      <DialogContent>
        <ImagePanel
          data={images}
          onClick={(index) => setIndex(index)}
          selected={index}
          className={classes.imagePanel}
        />
        <Button onClick={() => setAttribute('power')} className={classes.power} variant="contained">
          Sila
        </Button>
        <Button onClick={() => setAttribute('agility')} className={classes.agi} variant="contained">
          Obratnosť
        </Button>
        <Button
          onClick={() => setAttribute('intelligence')}
          className={classes.int}
          variant="contained"
        >
          Inteligencia
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onClose(index, attribute)}
          color="primary"
          disabled={index === -1 || attribute === null}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default compose(
  withState('index', 'setIndex', 0),
  withState('attribute', 'setAttribute', null),
  withStyles(styles)
)(ImageDialog)
