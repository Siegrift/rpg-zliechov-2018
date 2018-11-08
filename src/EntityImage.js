import React from 'react'
import classNames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

import PlaceholderCreature from './assets/creatures/creaturePlaceholder.png'

const styles = (theme) => ({
  imageWrapper: {
    display: 'grid',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    padding: theme.spacing.unit / 2,
  },
})

const EntityImage = ({ imageWrapperClassName, imageClassName, classes }) => {
  return (
    <Tooltip title="Vyber obrázok">
      <div className={classNames(imageWrapperClassName, classes.imageWrapper)}>
        <img src={PlaceholderCreature} alt="Placeholder creature" className={imageClassName} />
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(EntityImage)
