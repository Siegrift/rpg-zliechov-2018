import React from 'react'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import produce from 'immer'
import { withStyles } from '@material-ui/core/styles'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'

import ImagePanel from './ImagePanel'
import { updateValue as _updateValue } from './actions'
import { raceImages, itemImages, spellImages, creatureSpells, creatureImages } from './images'

const styles = (theme) => ({
  wrapper: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    width: `calc(50% - ${theme.spacing.unit}px)`,
    marginTop: theme.spacing.unit / 2,
  },
  heroDetailsWrapper: {
    marginTop: theme.spacing.unit / 2,
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.unit / 2,
  },
  heroDetails: {
    display: 'flex',
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
  },
  formPanel: {
    width: '50%',
    margin: 'auto',
    '& > div': {
      marginTop: theme.spacing.unit / 4,
      marginBottom: theme.spacing.unit / 4,
    },
  },
  image: {
    margin: 'auto',
    width: '50%',
    height: '50%',
  },
})

const TeamView = ({
  classes,
  className,
  selected,
  setSelected,
  isCreatureView,
  fighters,
  creatures,
  state,
  updateValue,
}) => {
  let imagePanelData
  let spellData
  let imageSrc
  let itemData
  if (isCreatureView) {
    const { spellIndexes, imageIndex } = creatures[selected]

    imagePanelData = creatures.map(({ imageIndex, name }) => ({
      image: creatureImages[imageIndex].image,
      title: name,
    }))
    spellData = spellIndexes.map((ind) => creatureSpells[ind])
    imageSrc = creatureImages[imageIndex].image
    itemData = []
  } else {
    const { race, spellLevels, imageIndex, items } = fighters[selected]

    imagePanelData = fighters.map(({ race, imageIndex, nick }) => ({
      image: isCreatureView ? creatureImages[imageIndex].image : raceImages[race][imageIndex].image,
      title: nick,
    }))
    spellData = spellImages[race].map((spell, i) => ({
      ...spell,
      title: `${spell.title} (${spellLevels[i]})`,
    }))
    imageSrc = raceImages[race][imageIndex].image
    itemData = items.map((index) => itemImages[index])
  }
  const { power, agility, intelligence } = isCreatureView ? creatures[selected] : fighters[selected]

  return (
    <div className={classNames(classes.wrapper, className)}>
      <ImagePanel data={imagePanelData} selected={selected} onClick={setSelected} withTitle />
      <div className={classes.heroDetailsWrapper}>
        <div className={classes.heroDetails}>
          <div className={classes.formPanel}>
            <FormGroup>
              <FormControl>
                <TextField label="Sila" value={power} />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <TextField label="Obratnosť" value={agility} />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <TextField label="Inteligencia" value={intelligence} />
              </FormControl>
            </FormGroup>
            <ImagePanel
              data={spellData}
              onClick={(ind) => {
                updateValue([], produce(state, (draftState) => spellData[ind].onInvoke(draftState)))
              }}
              animateOnClick
              withTitle
            />
          </div>
          <img src={imageSrc} className={classes.image} alt="Fighter" />
        </div>
        <ImagePanel
          data={itemData}
          onClick={(ind) => {
            updateValue([], produce(state, (draftState) => itemData[ind].onInvoke(draftState)))
          }}
          animateOnClick
          withTitle
        />
      </div>
    </div>
  )
}

export default compose(
  connect(
    (state) => ({
      state,
      fighters: state.fighters,
      creatures: state.creatures,
    }),
    { updateValue: _updateValue }
  ),
  withState('selected', 'setSelected', 0),
  withStyles(styles)
)(TeamView)
