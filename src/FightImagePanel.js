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
import ImageDialog from './ImageDialog'
import AttributeDialog from './AttributeDialog'
import { ANIMATION_TIME, CHOOSE } from './constants'

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
  overlayDisabled: {
    backgroundColor: 'rgba(156, 156, 156, 0.75) !important',
  },
  imagePanel: {
    justifyContent: 'center',
  },
})

class FightImagePanel extends React.Component {
  mounted = true

  constructor(props) {
    super(props)
    this.state = {
      animateIndex: -1,
      cancelTime: null,
      itemIndex: -1,
    }
  }

  setAnimateIndex = (animateIndex) => {
    this.setState((state) => ({ ...state, animateIndex }))
  }

  componentWillUnmount() {
    this.mounted = false
  }

  animateItem = (i) => {
    this.setAnimateIndex(i)
    const now = Date.now()
    this.setState((state) => ({ ...state, cancelTime: now }))
    setTimeout(() => {
      if (this.mounted && now === this.state.cancelTime) {
        this.setAnimateIndex(-1)
      }
    }, ANIMATION_TIME * 1000 + 500)
  }

  handleItemClick = (i, choice, unitIndex) => {
    this.setState({ itemIndex: -1 })
    this.props.onInvoke(i, choice, unitIndex)
    this.animateItem(i)
  }

  renderDialogs = () => {
    const { data, fightersImages, creaturesImages, selectedFighter, classes } = this.props
    const { itemIndex } = this.state
    const item = data[itemIndex]

    if (item.chooseAlly === CHOOSE.OTHER_UNIT) {
      return (
        <ImageDialog
          imagePanelClassName={classes.imagePanel}
          onClose={(index, choose) => {
            this.handleItemClick(itemIndex, choose)
          }}
          title="Zvoľ cieľ kúzla/predmetu"
          forceOk
          images={fightersImages.filter((_, i) => i !== selectedFighter)}
        />
      )
    }
    if (item.chooseAlly === CHOOSE.UNIT_OR_SELF) {
      return (
        <ImageDialog
          imagePanelClassName={classes.imagePanel}
          onClose={(index, choose) => {
            this.handleItemClick(itemIndex, choose)
          }}
          title="Zvoľ cieľ kúzla/predmetu"
          forceOk
          images={fightersImages}
        />
      )
    }
    if (item.chooseAlly === CHOOSE.ATTRIBUTE) {
      return (
        <AttributeDialog
          onClose={(index, unitIndex, attribute) => {
            this.handleItemClick(itemIndex, attribute, unitIndex)
          }}
          title="Zvoľ cieľ kúzla/predmetu"
          images={fightersImages}
        />
      )
    }

    if (item.chooseEnemy === CHOOSE.UNIT_OR_SELF || item.chooseEnemy === CHOOSE.OTHER_UNIT) {
      return (
        <ImageDialog
          imagePanelClassName={classes.imagePanel}
          onClose={(index, choose) => {
            this.handleItemClick(itemIndex, choose)
          }}
          title="Zvoľ cieľ kúzla/predmetu"
          forceOk
          images={fightersImages}
        />
      )
    }
    if (item.chooseEnemy === CHOOSE.ATTRIBUTE) {
      return (
        <AttributeDialog
          onClose={(index, unitIndex, attribute) => {
            this.handleItemClick(itemIndex, attribute, unitIndex)
          }}
          title="Zvoľ cieľ kúzla/predmetu"
          images={creaturesImages}
        />
      )
    }
    return null
  }

  render() {
    const {
      classes,
      className,
      data,
      state,
      creatures,
      fighters,
      selectedFighter,
      selectedCreature,
      isCreatureView,
      onInvoke,
    } = this.props

    const { animateIndex, itemIndex } = this.state
    return (
      <div className={classNames(classes.root, className)}>
        <GridList className={classes.gridList} cols={data.length}>
          {data.map((tile, i) => {
            const Component = (
              <GridListTile
                key={i}
                className={classNames(classes.tile)}
                onClick={() => {
                  if (
                    isCreatureView ||
                    (tile.isEnabled &&
                      !tile.isEnabled(
                        fighters[selectedFighter],
                        creatures[selectedCreature],
                        state
                      ))
                  ) {
                    return
                  }
                  if (tile.chooseAlly || tile.chooseEnemy) {
                    this.setState({ ...this.state, itemIndex: i })
                  } else {
                    onInvoke(i)
                    this.animateItem(i)
                  }
                }}
              >
                <img src={tile.image} alt={tile.title || 'tile'} className={classes.image} />
                <span
                  className={classNames(classes.overlay, {
                    [classes.overlayDisabled]:
                      tile.isEnabled &&
                      !tile.isEnabled(
                        fighters[selectedFighter],
                        creatures[selectedCreature],
                        state
                      ),
                  })}
                />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                    titleWrap: classes.titleWrap,
                  }}
                />
              </GridListTile>
            )
            return (
              <Tooltip key={i} title={tile.title}>
                {Component}
              </Tooltip>
            )
          })}
        </GridList>
        {animateIndex !== -1 && <Animate image={data[animateIndex].image} />}
        {itemIndex !== -1 && this.renderDialogs()}
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
)(FightImagePanel)