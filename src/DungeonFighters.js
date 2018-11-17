import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { clamp } from 'lodash'
import { compose, withState } from 'recompose'
import { connect } from 'react-redux'

import ImagePanel from './ImagePanel'
import AutoComplete from './AutoComplete'
import EntityImage from './EntityImage'
import EntityPlaceholderImage from './assets/entityPlaceholder.png'
import {
  updateValue as _updateValue,
  prepareStateForFight as _prepareStateForFight,
  buffCreature as _buffCreature,
} from './actions'
import { createDefaultFighter } from './store/initialState'
import { raceImages, addUnitImage } from './units'
import { items } from './items'
import { fighterSpells } from './spells'
import { canUpgradeSpell } from './spellHelpers'

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing.unit,
  },
  fightersPanel: {
    height: '70%',
  },
  form: {
    marginTop: theme.spacing.unit / 2,
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.unit / 2,
  },
  image: {
    maxHeight: 500,
    margin: 'auto',
    maxWidth: '80%',
  },
  fighterDetails: {
    display: 'flex',
    '& > div': {
      width: '50%',
      margin: 'auto',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  fighterDetailsForm: {
    '& > *': {
      margin: theme.spacing.unit / 8,
    },
  },
  formField: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  divider: {
    marginTop: theme.spacing.unit / 4,
    marginBottom: theme.spacing.unit / 4,
  },
  buttonWrapper: {
    marginTop: theme.spacing.unit / 4,
    display: 'flex',
  },
  button: {
    margin: 'auto',
    display: 'block',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit + 4,
    marginTop: -12,
  },
  fightersImagePanel: {
    justifyContent: 'space-around',
  },
})

const freeAttributes = ({ level, spellLevels }) => {
  return level - spellLevels.reduce((acc, lvl) => acc + lvl, 0)
}

const isSubmitDisabled = (fighters) => {
  for (const f of fighters) {
    if (
      f.nick === '' ||
      f.level <= 0 ||
      f.power <= 0 ||
      f.agi <= 0 ||
      f.int <= 0 ||
      freeAttributes(f) !== 0
    ) {
      return true
    }
  }
  return false
}

const DungeonFighters = ({
  classes,
  selectedFighter,
  setSelectedFighter,
  fighters,
  updateValue,
  prepareStateForFight,
  buffCreature,
}) => {
  const {
    nick,
    race,
    level,
    power,
    agi,
    int,
    spellLevels,
    imageIndex,
    itemIndexes,
    itemLevels,
  } = fighters[selectedFighter]
  const fightersImageData = [
    ...fighters.map(({ race, nick, imageIndex }, index) => ({
      image: imageIndex === -1 ? EntityPlaceholderImage : raceImages[race][imageIndex].image,
      title: nick,
    })),
    addUnitImage,
  ]

  const isDisabled = isSubmitDisabled(fighters)
  return (
    <div className={classes.wrapper}>
      <ImagePanel
        data={fightersImageData}
        onClick={(index) => {
          if (index === fighters.length) {
            updateValue(['fighters'], [...fighters, createDefaultFighter(true)])
          }
          setSelectedFighter(index)
        }}
        selected={selectedFighter}
        className={classes.fightersImagePanel}
        withTitle
      />

      <div className={classes.form}>
        <IconButton
          className={classes.closeButton}
          onClick={() => {
            if (fighters.length !== 1) {
              updateValue(['fighters'], fighters.filter((_, i) => i !== selectedFighter))
              setSelectedFighter(Math.max(0, selectedFighter - 1))
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography component="h4" variant="h4" gutterBottom className={classes.title}>
          {nick}
        </Typography>

        <div className={classes.fighterDetails}>
          <div className={classes.fighterDetailsForm}>
            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField
                  label="Nick"
                  placeholder="Zadaj svoj nick"
                  value={nick}
                  onChange={(e) =>
                    updateValue(['fighters', selectedFighter, 'nick'], e.target.value)
                  }
                />
              </FormControl>
            </FormGroup>

            <FormControl className={classes.formField}>
              <InputLabel htmlFor="choose-race">Klasa</InputLabel>
              <Select
                value={race}
                onChange={(e) => {
                  const raceIndex = e.target.value
                  updateValue(['fighters', selectedFighter, 'race'], raceIndex)
                  updateValue(
                    ['fighters', selectedFighter, 'imageIndex'],
                    clamp(imageIndex, 0, raceImages[raceIndex].length - 1)
                  )
                }}
                inputProps={{
                  name: 'race',
                  id: 'choose-race',
                }}
              >
                <MenuItem value={0}>Mág</MenuItem>
                <MenuItem value={1}>Lovec</MenuItem>
                <MenuItem value={2}>Kňaz</MenuItem>
                <MenuItem value={3}>Černokňažník</MenuItem>
                <MenuItem value={4}>Bojovník</MenuItem>
              </Select>
            </FormControl>

            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField
                  type="number"
                  label="Level"
                  placeholder="Zadaj svoj level"
                  value={level}
                  onChange={(e) =>
                    updateValue(['fighters', selectedFighter, 'level'], e.target.value)
                  }
                />
              </FormControl>
            </FormGroup>

            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField
                  type="number"
                  label="Sila"
                  placeholder="Zadaj svoju silu"
                  value={power}
                  onChange={(e) =>
                    updateValue(['fighters', selectedFighter, 'power'], e.target.value)
                  }
                />
              </FormControl>
            </FormGroup>

            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField
                  type="number"
                  label="Obratnosť"
                  placeholder="Zadaj svoju obratnosť"
                  value={agi}
                  onChange={(e) =>
                    updateValue(['fighters', selectedFighter, 'agi'], e.target.value)
                  }
                />
              </FormControl>
            </FormGroup>

            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField
                  type="number"
                  label="Inteligencia"
                  placeholder="Zadaj svoju inteligenciu"
                  value={int}
                  onChange={(e) =>
                    updateValue(['fighters', selectedFighter, 'int'], e.target.value)
                  }
                />
              </FormControl>
            </FormGroup>
          </div>
          <EntityImage
            imageClassName={classes.image}
            images={raceImages[race]}
            currentImage={imageIndex !== -1 && raceImages[race][imageIndex].image}
            onChange={(index) => {
              if (index !== -1) {
                updateValue(['fighters', selectedFighter, 'imageIndex'], index)
              }
            }}
          />
        </div>
        <Divider className={classes.divider} />

        <FormLabel component="legend">{`Kúzla (ostáva ${freeAttributes(
          fighters[selectedFighter]
        )})`}</FormLabel>
        <ImagePanel
          data={fighterSpells[race].map((spell, i) => ({
            ...spell,
            title: `${spell.title} (${spellLevels[i]})`,
            isEnabled: () =>
              canUpgradeSpell(freeAttributes(fighters[selectedFighter]), i, spellLevels[i], level),
          }))}
          withTitle
          onClick={(ind) => {
            updateValue(['fighters', selectedFighter, 'spellLevels', ind], spellLevels[ind] + 1)
          }}
        />
        <Divider className={classes.divider} />

        <AutoComplete
          label="Predmety"
          data={items}
          placeholder="Zvoľ svoje itemy"
          value={itemIndexes}
          onChange={(value) => {
            const newIndexes = value.map((v) => v.ind)
            const itemSet = new Map(itemIndexes.map((item, i) => [item, itemLevels[i]]))
            updateValue(['fighters', selectedFighter, 'itemIndexes'], newIndexes)
            updateValue(
              ['fighters', selectedFighter, 'itemLevels'],
              newIndexes.map((index) => {
                if (itemSet.has(index)) return itemSet.get(index)
                return 1
              })
            )
          }}
        />
        <ImagePanel
          data={itemIndexes.map((item, i) => ({
            ...items[item],
            title: `${items[item].title} (${itemLevels[i]})`,
            isEnabled: () => true,
          }))}
          withTitle
          onClick={(ind) => {
            updateValue(['fighters', selectedFighter, 'itemLevels', ind], itemLevels[ind] + 1)
          }}
        />
        <Divider className={classes.divider} />

        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            onClick={() => {
              prepareStateForFight()
              buffCreature()
              updateValue(['page'], 'creature_buff')
            }}
            disabled={isDisabled}
          >
            {isDisabled ? 'Niektoré políčka sú neplatné!' : 'Pokračuj na boj'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default compose(
  connect(
    (state) => ({
      fighters: state.fighters,
    }),
    {
      updateValue: _updateValue,
      prepareStateForFight: _prepareStateForFight,
      buffCreature: _buffCreature,
    }
  ),
  withState('selectedFighter', 'setSelectedFighter', 0),
  withStyles(styles)
)(DungeonFighters)
