import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import classNames from 'classnames'
import { withState, compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  root: {
    zIndex: 100000,
  },
  attribute2: {
    marginTop: theme.spacing.unit / 2,
    border: '2px solid rgba(0, 0, 0, 0)',
    backgroundColor: 'rgb(0, 0, 220)',
    '&:hover': {
      backgroundColor: 'rgb(0, 0, 150)',
    },
  },
  attribute1: {
    marginTop: theme.spacing.unit / 2,
    border: '2px solid rgba(0, 0, 0, 0)',
    backgroundColor: 'rgb(0, 220, 0)',
    '&:hover': {
      backgroundColor: 'rgb(0, 150, 0)',
    },
  },
  attribute0: {
    marginTop: theme.spacing.unit / 2,
    border: '2px solid rgba(0, 0, 0, 0)',
    backgroundColor: 'rgb(220, 0, 0)',
    '&:hover': {
      backgroundColor: 'rgb(150, 0, 0)',
    },
  },
  selected: {
    border: '2px solid black',
  },
})

const SimpleAttributeDialog = ({
  enabledAttributes,
  classes,
  onClose,
  images,
  attribute,
  setAttribute,
}) => {
  return (
    <Dialog
      open
      aria-labelledby="form-dialog-title"
      classes={{ root: classes.root }}
      onClose={() => onClose(-1, null)}
    >
      <DialogTitle id="form-dialog-title">Vyber atribút</DialogTitle>
      <DialogContent>
        {['Sila', 'Obratnosť', 'Inteligencia'].map((title, i) => (
          <Button
            key={i}
            disabled={!enabledAttributes[i]}
            onClick={() => setAttribute(i)}
            className={classNames(classes[`attribute${i}`], attribute === i && classes.selected)}
            variant="contained"
          >
            {title}
          </Button>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(attribute)} color="primary" disabled={attribute === null}>
          OK
        </Button>
        <Button onClick={() => onClose(-1)} color="primary">
          Zavrieť
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default compose(
  withState('attribute', 'setAttribute', null),
  withStyles(styles)
)(SimpleAttributeDialog)
