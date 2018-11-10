import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import { SPELL_ANIMATION_SIZE, ANIMATION_TIME } from './constants'

const styles = (theme) => ({
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
    width: 0,
    height: 0,
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

    if (!image) return null
    return (
      <img
        src={image}
        alt="Selected enchantment"
        className={classNames(classes.hidden, invokeSpell && classes.invokeSpellAnimation)}
      />
    )
  }
}

export default withStyles(styles)(Animate)
