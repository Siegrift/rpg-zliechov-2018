import React from 'react'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import produce from 'immer'
import { withStyles } from '@material-ui/core/styles'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'

import ImagePanel from './ImagePanel'
import FightImagePanel from './FightImagePanel'
import { updateValue as _updateValue } from './actions'
import { raceImages, creatureImages } from './units'
import { fighterSpells, creatureSpells } from './spells'
import { items } from './items'

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
    height: '65vh',
  },
  heroDetails: {
    display: 'flex',
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
  },
  formPanel: {
    width: '100%',
    '& > div': {
      marginTop: theme.spacing.unit / 4,
      marginBottom: theme.spacing.unit / 4,
    },
  },
  imagePanel: {
    justifyContent: 'space-around',
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
  selectedCreature,
  selectedFighter,
}) => {
  let spellData
  let itemData
  const creaturesImageData = creatures.map(({ imageIndex, name }) => ({
    image: creatureImages[imageIndex].image,
    title: name,
  }))
  const fightersImageData = fighters.map(({ race, imageIndex, nick }) => ({
    image: isCreatureView ? creatureImages[imageIndex].image : raceImages[race][imageIndex].image,
    title: nick,
  }))

  if (isCreatureView) {
    const { spellIndexes } = creatures[selected]
    spellData = spellIndexes.map((ind) => ({ ...creatureSpells[ind], isEnabled: () => false }))
    itemData = []
  } else {
    const { race, spellLevels, itemIndexes, itemLevels } = fighters[selected]

    spellData = fighterSpells[race].map((spell, i) => ({
      ...spell,
      title: `${spell.title} (${spellLevels[i]})`,
    }))
    itemData = itemIndexes.map((index, i) => ({
      ...items[index],
      title: `${items[index].title} (${itemLevels[i]})`,
    }))
  }
  const { power, agi, int, manaPool } = isCreatureView ? creatures[selected] : fighters[selected]
  const imagePanelData = isCreatureView ? creaturesImageData : fightersImageData

  return (
    <div className={classNames(classes.wrapper, className)}>
      <ImagePanel
        data={imagePanelData}
        selected={selected}
        onClick={setSelected}
        withTitle
        className={classes.imagePanel}
        isCreatureView={isCreatureView}
      />
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
                <TextField label="Obratnosť" value={agi} />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <TextField label="Inteligencia" value={int} />
              </FormControl>
            </FormGroup>
            {manaPool && (
              <FormGroup>
                <FormControl>
                  <TextField label="Mana pool" value={manaPool} />
                </FormControl>
              </FormGroup>
            )}
            <FightImagePanel
              fightersImages={imagePanelData}
              creaturesImages={creaturesImageData}
              data={spellData}
              onInvoke={(ind, choose, unitIndex) => {
                updateValue(
                  [],
                  produce(state, (draftState) =>
                    spellData[ind].onInvoke(
                      draftState.fighters[selectedFighter],
                      draftState.creatures[selectedCreature],
                      draftState,
                      choose,
                      unitIndex
                    )
                  )
                )
              }}
            />
          </div>
        </div>
        <FightImagePanel
          fightersImages={imagePanelData}
          creaturesImages={creaturesImageData}
          data={itemData}
          onInvoke={(ind, choose, unitIndex) => {
            updateValue(
              [],
              produce(state, (draftState) =>
                itemData[ind].onInvoke(
                  draftState.fighters[selectedFighter],
                  draftState.creatures[selectedCreature],
                  draftState,
                  choose,
                  unitIndex
                )
              )
            )
          }}
        />
      </div>
    </div>
  )
}

export default compose(
  connect(
    (state) => ({
      state,
      ...state,
    }),
    { updateValue: _updateValue }
  ),
  withProps(({ isCreatureView, selectedCreature, selectedFighter, updateValue }) => ({
    selected: isCreatureView ? selectedCreature : selectedFighter,
    setSelected: (index) =>
      updateValue([isCreatureView ? 'selectedCreature' : 'selectedFighter'], index),
  })),
  withStyles(styles)
)(TeamView)
