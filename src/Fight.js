import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import DialogContentText from '@material-ui/core/DialogContentText'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Dead from './assets/dead.png'

import TeamView from './TeamView'
import Stats from './Stats'
import withStatProps from './withStatProps'
import getInitialState from './store/initialState'
import { updateValue as _updateValue, giveUpFight as _giveUpFight } from './actions'
import { creatureImages } from './units'
import { CARD_IMAGE_SIZE, ANIMATION_TIME } from './constants'

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing.unit / 2,
  },
  divider: {
    borderLeft: '3px solid gray',
    height: '100%',
    position: 'fixed',
    left: '50%',
    zIndex: '2',
    top: '0',
  },
  panel: {
    display: 'flex',
  },
  title: {
    textAlign: 'center',
  },
  primaryImage: {
    width: `${CARD_IMAGE_SIZE}px`,
    height: `${CARD_IMAGE_SIZE}px`,
  },
  overlayImage: {
    width: `${CARD_IMAGE_SIZE}px`,
    height: `${CARD_IMAGE_SIZE}px`,
    marginTop: `-${CARD_IMAGE_SIZE}px`,
  },
  giveUpButtonWrapper: {
    display: 'flex',
  },
  giveUpButton: {
    margin: theme.spacing.unit / 2,
    zIndex: 2,
    flex: 1,
  },
  dialogRoot: {
    maxHeight: 2000,
    ' & > div': {
      display: 'grid',
    },
  },
})

const formatGiveUpText = (name) => (
  <span>
    Ak sa rozhodnete vzdať súboj, najsilnejší zo skupiny
    <b style={{ margin: '5px' }}>{name}</b>
    zomrie a pridá sa k príšere a nedostanete žiadne body.
  </span>
)

const getChief = (fighters) => {
  return fighters.find((f) => f.isChief)
}

const Transition = (props) => {
  return <Slide direction="up" {...props} />
}

class Fight extends React.Component {
  mounted = true

  constructor(props) {
    super(props)
    this.state = { showWinDialog: false }
  }

  setAppInitialState = () => {
    this.props.updateValue([], getInitialState(), 'Set initial state')
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const {
      classes,
      creaturesPower,
      creaturesAgi,
      creaturesInt,
      imageIndex,
      creatureName,
      giveUpFight,
      creatures,
      fighters,
    } = this.props
    const { showWinDialog, showGiveUpDialog } = this.state

    if (!showWinDialog && creaturesPower <= 0 && creaturesAgi <= 0 && creaturesInt <= 0) {
      // use setTimeut to show the dialog after spell/item ends
      setTimeout(() => {
        if (this.mounted) this.setState((state) => ({ ...state, showWinDialog: true }))
      }, ANIMATION_TIME * 1000 + 500)
    }

    return (
      <div className={classes.wrapper}>
        <Stats />
        <div className={classes.panel}>
          <TeamView />
          <div className={classes.divider} />
          <TeamView isCreatureView />
        </div>
        {showWinDialog && (
          <Dialog
            open
            onClose={this.setAppInitialState}
            TransitionComponent={Transition}
            aria-labelledby="form-dialog-title"
            classes={{
              paper: classes.dialogRoot,
            }}
          >
            <DialogTitle id="form-dialog-title" className={classes.title}>
              Gratulujeme! Príšera "{creatureName}" zabitá!
            </DialogTitle>
            <DialogContent>
              <img
                alt="Príšera"
                className={classes.primaryImage}
                src={creatureImages[imageIndex].image}
              />
              <img alt="Kríž" className={classes.overlayImage} src={Dead} />
              <p>{JSON.stringify(creatures[0].rewardItems)}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.setAppInitialState} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {showGiveUpDialog && (
          <Dialog open onClose={this.handleClose}>
            <DialogTitle>Naozaj chcete vzdať súboj?</DialogTitle>
            <DialogContent>
              <DialogContentText>{formatGiveUpText(getChief(fighters).nick)}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={giveUpFight} color="primary">
                Áno
              </Button>
              <Button
                onClick={() => this.setState((state) => ({ ...state, showGiveUpDialog: false }))}
                color="primary"
                autoFocus
              >
                Nie
              </Button>
            </DialogActions>
          </Dialog>
        )}
        <div className={classes.giveUpButtonWrapper}>
          <Button
            onClick={() => this.setState((state) => ({ ...state, showGiveUpDialog: true }))}
            color="secondary"
            variant="contained"
            className={classes.giveUpButton}
          >
            Vzdať súboj
          </Button>
        </div>
      </div>
    )
  }
}
export default compose(
  connect(
    (state) => ({
      creatures: state.creatures,
      fighters: state.fighters,
      imageIndex: state.creatures[0].imageIndex,
      creatureName: state.creatures[0].name,
    }),
    { updateValue: _updateValue, giveUpFight: _giveUpFight }
  ),
  withStatProps,
  withStyles(styles)
)(Fight)
