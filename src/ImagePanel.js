import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'
import { compose, withState } from 'recompose'

const SPELL_ANIMATION_SIZE = 250
const ANIMATION_TIME = 0.5

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
    maxWidth: '120px',
    maxHeight: '120px',
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
    height: '1500px',
    width: '1500px',
    position: 'relative',
    bottom: '1500px',
    marginBottom: '-1500px',
    zIndex: 2,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
  overlaySelected: {
    backgroundColor: 'rgba(0, 0, 255, 0.4) !important',
  },
  invokeSpellAnimation: {
    width: `${SPELL_ANIMATION_SIZE}px !important`,
    height: `${SPELL_ANIMATION_SIZE}px !important`,
    visibility: 'visible !important',
    transform: `translate(-${SPELL_ANIMATION_SIZE / 2}px, -${SPELL_ANIMATION_SIZE / 2}px)`,
    opacity: '1 !important',
  },
  hidden: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    zIndex: 3,
    transition: `transform ${ANIMATION_TIME}s, width ${ANIMATION_TIME}s, height ${ANIMATION_TIME}s, left ${ANIMATION_TIME}s, opacity ${ANIMATION_TIME}s linear`,
    width: '0px',
    height: '0px',
    opacity: 0,
    visibility: 'hidden',
  },
})

class Animate extends React.Component {
  state = {}
  componentDidMount() {
    // eslint-disable-next-line
    if (!this.state.invokeSpell) this.setState({ invokeSpell: true })
  }

  render() {
    const { image, classes } = this.props
    const { invokeSpell } = this.state

    return (
      <img
        src={image}
        alt="Selected enchantment"
        className={classNames(classes.hidden, invokeSpell && classes.invokeSpellAnimation)}
      />
    )
  }
}

const ImagePanel = ({
  classes,
  className,
  data,
  autoresize,
  onClick,
  selected,
  animateOnClick,
  animateIndex,
  setAnimateIndex,
  withTitle,
}) => {
  return (
    <div className={classNames(classes.root, className)}>
      <GridList className={classes.gridList} cols={data.length}>
        {data.map((tile, i) => {
          const Tile = (
            <GridListTile
              key={i}
              className={classes.tile}
              onClick={() => {
                if (onClick) onClick(i)
                if (animateOnClick) {
                  setAnimateIndex(i)
                  setTimeout(() => {
                    setAnimateIndex(-1)
                  }, 1000)
                }
              }}
            >
              <img src={tile.image} alt={tile.title || 'tile'} className={classes.image} />
              <span
                className={classNames(classes.overlay, selected === i && classes.overlaySelected)}
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
          )
          return withTitle ? (
            <Tooltip key={i} title={tile.title}>
              {Tile}
            </Tooltip>
          ) : (
            Tile
          )
        })}
      </GridList>
      {animateIndex !== -1 && <Animate image={data[animateIndex].image} classes={classes} />}
    </div>
  )
}

export default compose(
  withState('animateIndex', 'setAnimateIndex', -1),
  withStyles(styles)
)(ImagePanel)
