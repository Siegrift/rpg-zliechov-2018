import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withState, compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles'

import IconPanel from './IconPanel'

const styles = {
  root: {
    zIndex: 100000,
  },
}

const ImageDialog = ({ classes, onClose, images, index, setIndex }) => {
  return (
    <Dialog
      open
      onClose={() => onClose(index)}
      aria-labelledby="form-dialog-title"
      classes={{ root: classes.root }}
    >
      <DialogTitle id="form-dialog-title">Vyber obrázok</DialogTitle>
      <DialogContent>
        <IconPanel data={images} onClick={(index) => setIndex(index)} selected={index} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(index)} color="primary" disabled={index === -1}>
          OK
        </Button>
        <Button onClick={() => onClose(index)} color="primary">
          Zavrieť
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default compose(
  withState('index', 'setIndex', -1),
  withStyles(styles)
)(ImageDialog)
