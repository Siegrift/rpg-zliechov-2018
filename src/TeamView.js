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
import { formatItemTitle, formatSpellTitle } from './helpers'

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
    [theme.breakpoints.down('lg')]: {
      height: '76vh',
    },
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
  bonusStat: {
    color: 'green',
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
    ...creatureImages[imageIndex],
    title: name,
  }))
  const fightersImageData = fighters.map(({ race, imageIndex, nick, isChief }) => ({
    ...(isCreatureView ? creatureImages[imageIndex] : raceImages[race][imageIndex]),
    title: nick,
    isChief,
  }))

  if (isCreatureView) {
    const { spellIndexes } = creatures[selected]
    spellData = spellIndexes.map((ind) => ({ ...creatureSpells[ind], isEnabled: () => false }))
    itemData = []
  } else {
    const { race, spellLevels, itemIndexes, itemLevels, spellCasted, itemCasted } = fighters[
      selected
    ]

    spellData = fighterSpells[race].map((spell, i) => ({
      ...spell,
      title: formatSpellTitle(spell, spellLevels[i], i),
      isEnabled: spellCasted[i] || spellLevels[i] === 0 ? () => false : spell.isEnabled,
    }))
    itemData = itemIndexes.map((index, i) => ({
      ...items[index],
      title: formatItemTitle(items[index], itemLevels[i]),
      isEnabled: itemCasted[i] || itemLevels[i] === 0 ? () => false : items[index].isEnabled,
    }))
  }
  const { power, bonusPower = 0, agi, bonusAgi = 0, int, bonusInt = 0, manaPool } = isCreatureView
    ? creatures[selected]
    : fighters[selected]
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
                <TextField
                  InputProps={{
                    endAdornment: <span className={classes.bonusStat}>{`+${bonusPower}`}</span>,
                  }}
                  label="Sila"
                  value={power + bonusPower}
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <TextField
                  InputProps={{
                    endAdornment: <span className={classes.bonusStat}>{`+${bonusAgi}`}</span>,
                  }}
                  label="Obratnosť"
                  value={agi + bonusAgi}
                />
              </FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl>
                <TextField
                  InputProps={{
                    endAdornment: <span className={classes.bonusStat}>{`+${bonusInt}`}</span>,
                  }}
                  label="Inteligencia"
                  value={int + bonusInt}
                />
              </FormControl>
            </FormGroup>
            {!!manaPool && (
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
              selectedFighterId={fighters[selectedFighter].id}
              onItemClick={(ind, chosenIndex, attribute) => {
                updateValue(
                  [],
                  produce(state, (draftState) => {
                    draftState.fighters[selectedFighter].spellCasted[ind] = true
                    spellData[ind].onInvoke({
                      fighter: draftState.fighters[selectedFighter],
                      creature: draftState.creatures[selectedCreature],
                      state: draftState,
                      chosen: draftState[isCreatureView ? 'creatures' : 'fighters'][chosenIndex],
                      attribute,
                      index: ind,
                    })
                  }),
                  'Invoke spell'
                )
              }}
            />
          </div>
        </div>
        <FightImagePanel
          fightersImages={imagePanelData}
          creaturesImages={creaturesImageData}
          data={itemData}
          selectedFighterId={fighters[selectedFighter].id}
          onItemClick={(ind, chosenIndex, attribute) => {
            updateValue(
              [],
              produce(state, (draftState) => {
                draftState.fighters[selectedFighter].itemCasted[ind] = true
                itemData[ind].onInvoke({
                  fighter: draftState.fighters[selectedFighter],
                  creature: draftState.creatures[selectedCreature],
                  state: draftState,
                  chosen: draftState[isCreatureView ? 'creatures' : 'fighters'][chosenIndex],
                  attribute,
                  index: ind,
                })
              }),
              'Invoke spell'
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
