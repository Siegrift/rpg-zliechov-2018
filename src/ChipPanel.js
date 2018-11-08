import React from 'react'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 8,
  },
})

const ChipPanel = ({ classes, chips, onClick, onDelete }) => {
  return (
    <div className={classes.root}>
      {chips.map((chip, i) => (
        <Chip
          key={i}
          label={chip}
          onClick={() => onClick && onClick(i)}
          onDelete={() => onDelete && onDelete(i)}
          className={classes.chip}
        />
      ))}
    </div>
  )
}

export default withStyles(styles)(ChipPanel)
