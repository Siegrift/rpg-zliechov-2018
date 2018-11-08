import React from 'react'
import classNames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState } from 'recompose'

import ImageDialog from './ImageDialog'

import PlaceholderCreature from './assets/entityPlaceholder.png'

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

const EntityImage = ({
  imageWrapperClassName,
  imageClassName,
  classes,
  images,
  onChange,
  showDialog,
  setShowDialog,
  currentImage,
}) => {
  return (
    <Tooltip title="Vyber obrázok" disableHoverListener={showDialog}>
      <div>
        <div
          className={classNames(imageWrapperClassName, classes.imageWrapper)}
          onClick={() => setShowDialog(true)}
        >
          <img
            src={currentImage || PlaceholderCreature}
            alt="Placeholder creature"
            className={imageClassName}
          />
        </div>
        {showDialog && (
          <ImageDialog
            images={images}
            onClose={(index) => {
              setShowDialog(false)
              if (index !== -1) onChange(index)
            }}
          />
        )}
      </div>
    </Tooltip>
  )
}

export default compose(
  withState('showDialog', 'setShowDialog', false),
  withStyles(styles)
)(EntityImage)
