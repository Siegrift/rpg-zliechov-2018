import React from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Animate from './Animate'
import { ANIMATION_TIME } from './constants'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  tile: {
    borderRadius: theme.shape.borderRadius,
    '& > *': {
      borderRadius: theme.shape.borderRadius,
    },
    cursor: 'pointer',
    maxWidth: 120,
    maxHeight: 120,
  },
  smallTiles: {
    maxWidth: 80,
    maxHeight: 80,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: '1.2em',
  },
  titleWrap: {
    textAlign: 'center',
    margin: 'auto',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)',
  },
  overlay: {
    backgroundColor: 'rgb(0, 0, 0, 0)',
    display: 'inline-block',
    height: 1500,
    width: 1500,
    position: 'relative',
    bottom: 1500,
    marginBottom: -1500,
    zIndex: 2,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  overlaySelected: {
    backgroundColor: 'rgba(0, 0, 255, 0.4) !important',
  },
  overlayDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.5) !important',
  },
})

class ImagePanel extends React.Component {
  mounted = true

  constructor(props) {
    super(props)
    this.state = { animateIndex: -1, cancelTime: null }
  }

  setAnimateIndex = (animateIndex) => {
    this.setState((state) => ({ ...state, animateIndex }))
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const {
      classes,
      className,
      data,
      onClick,
      selected,
      animateOnClick,
      withTitle,
      state,
      smallTiles,
    } = this.props

    const { animateIndex } = this.state
    return (
      <div className={classNames(classes.root, className)}>
        <GridList className={classes.gridList} cols={data.length}>
          {data.map((tile, i) => (
            <GridListTile
              key={i}
              className={classNames(classes.tile, smallTiles && classes.smallTiles)}
              onClick={() => {
                if (tile.isEnabled && !tile.isEnabled(state)) return
                if (onClick) onClick(i)
                if (animateOnClick) {
                  this.setAnimateIndex(i)
                  const now = Date.now()
                  this.setState((state) => ({ ...state, cancelTime: now }))
                  setTimeout(() => {
                    if (this.mounted && now === this.state.cancelTime) {
                      this.setAnimateIndex(-1)
                    }
                  }, ANIMATION_TIME * 1000 + 500)
                }
              }}
            >
              <img src={tile.image} alt={tile.title || 'tile'} className={classes.image} />
              <span
                className={classNames(classes.overlay, {
                  [classes.overlaySelected]: selected === i,
                  [classes.overlayDisabled]: tile.isEnabled && !tile.isEnabled(state),
                })}
              />
              {withTitle && (
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                    titleWrap: classes.titleWrap,
                  }}
                />
              )}
            </GridListTile>
          ))}
        </GridList>
        <Animate image={animateIndex !== -1 ? data[animateIndex].image : null} />
      </div>
    )
  }
}

export default compose(
  connect((state) => ({
    state,
  })),
  withStyles(styles)
)(ImagePanel)
