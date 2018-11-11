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
import { updateValue as _updateValue } from './actions'
import { creatureImages } from './units'
import { CARD_IMAGE_SIZE, ANIMATION_TIME } from './constants'
import getInitialState from './store/initialState'

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

const giveUpText =
  'Ak sa rozhodnete vzdať súboj, program neuloží žiaden váš progress a nedostanete žiadne body.'

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
      fightersPower,
      fightersAgi,
      fightersInt,
      creaturesPower,
      creaturesAgi,
      creaturesInt,
      imageIndex,
      creatureName,
    } = this.props
    const { showWinDialog, showGiveUpDialog } = this.state

    if (
      !showWinDialog &&
      fightersPower >= creaturesPower &&
      fightersAgi >= creaturesAgi &&
      fightersInt >= creaturesInt
    ) {
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
              <DialogContentText>{giveUpText}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.setAppInitialState} color="primary">
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
    { updateValue: _updateValue }
  ),
  withStatProps,
  withStyles(styles)
)(Fight)
