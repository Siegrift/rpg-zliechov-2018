import React from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Chief from './assets/chief.png'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
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
  selectedTile: {
    border: '2px solid black',
  },
  overlayDisabled: {
    backgroundColor: 'rgba(156, 156, 156, 0.75) !important',
  },
  passiveTile: {
    border: '2px solid red',
  },
  chief: {
    position: 'absolute',
    width: '50px',
    right: '-6px',
    transform: 'none',
    top: '-6px',
    left: 'auto',
    height: 'auto',
  },
  levelPanel: {
    position: 'absolute',
    top: 0,
    '& > *': {
      width: 30,
      height: 30,
      minWidth: '0 !important',
      minHeight: '0 !important',
      display: 'block',
      margin: '0.3em',
      zIndex: 3,
    },
  },
})

class ImagePanel extends React.Component {
  state = { hoverIndex: -1 }

  render() {
    const {
      classes,
      className,
      data,
      onClick,
      selected,
      withTitle,
      withTooltip,
      state,
      smallTiles,
      creatures,
      fighters,
      selectedFighter,
      selectedCreature,
      unclickable,
      onIncrease,
      onDecrease,
      hoverable,
    } = this.props
    const { hoverIndex } = this.state

    const isDisabled = (tile, index) => {
      return (
        tile.isEnabled &&
        !tile.isEnabled({
          fighter: fighters[selectedFighter],
          creature: creatures[selectedCreature],
          state,
          index,
        })
      )
    }

    return (
      <div className={classNames(classes.root, className)}>
        <GridList className={classes.gridList} cols={data.length}>
          {data.map((tile, i) => {
            const Component = (
              <GridListTile
                onMouseEnter={() => this.setState({ hoverIndex: i })}
                onMouseLeave={() => this.setState({ hoverIndex: -1 })}
                key={i}
                classes={{
                  root: classNames(classes.tile, smallTiles && classes.smallTiles),
                  tile: classNames({
                    [classes.selectedTile]: selected === i,
                    [classes.passiveTile]: tile.passive,
                  }),
                }}
                onClick={() => {
                  if (unclickable || isDisabled(tile, i) || (tile.passive && !tile.maxLevel)) {
                    return
                  }
                  if (onClick) onClick(i)
                }}
              >
                <img src={tile.image} alt={tile.title || 'tile'} className={classes.image} />
                {tile.isChief && <img src={Chief} className={classes.chief} />}
                <span
                  className={classNames(classes.overlay, {
                    [classes.overlayDisabled]: isDisabled(tile, i),
                  })}
                />
                {(!hoverable || hoverable(i)) && onIncrease && hoverIndex === i && (
                  <div className={classes.levelPanel}>
                    <Button variant="fab" onClick={() => onDecrease && onDecrease(i)}>
                      -
                    </Button>
                    <Button variant="fab" onClick={() => onIncrease && onIncrease(i)}>
                      +
                    </Button>
                  </div>
                )}
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
            )
            return withTitle || withTooltip ? (
              <Tooltip key={i} title={tile.title}>
                {Component}
              </Tooltip>
            ) : (
              Component
            )
          })}
        </GridList>
      </div>
    )
  }
}

export default compose(
  connect((state) => ({
    state,
    ...state,
  })),
  withStyles(styles)
)(ImagePanel)
