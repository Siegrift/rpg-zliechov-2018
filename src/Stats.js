import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'recompose'

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      margin: theme.spacing.unit / 8,
    },
  },
  progressWrapper: {
    height: '20px',
  },
  intelligenceBar: {
    backgroundColor: 'rgb(0, 0, 220)',
  },
  intelligence: {
    height: '20px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(0, 0, 110)',
  },
  agilityBar: {
    backgroundColor: 'rgb(0, 220, 0)',
  },
  agility: {
    height: '20px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(0, 110, 0)',
  },
  powerBar: {
    backgroundColor: 'rgb(220, 0, 0)',
  },
  power: {
    height: '20px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(110, 0, 0)',
  },
  barText: {
    color: 'white',
    position: 'relative',
    top: '-19px',
    left: '9px',
  },
  barTextEnd: {
    color: 'white',
    position: 'relative',
    float: 'right',
    top: '-19px',
    right: '9px',
  },
})

const Stats = ({ classes, creatures, fighters }) => {
  const fightersPower = fighters.reduce((acc, f) => acc + parseInt(f.power, 10), 0)
  const fightersAgi = fighters.reduce((acc, f) => acc + parseInt(f.agility, 10), 0)
  const fightersInt = fighters.reduce((acc, f) => acc + parseInt(f.intelligence, 10), 0)

  const creaturesPower = creatures.reduce((acc, f) => acc + parseInt(f.power, 10), 0)
  const creaturesAgi = creatures.reduce((acc, f) => acc + parseInt(f.agility, 10), 0)
  const creaturesInt = creatures.reduce((acc, f) => acc + parseInt(f.intelligence, 10), 0)

  const sumPower = fightersPower + creaturesPower
  const sumAgi = fightersAgi + creaturesAgi
  const sumInt = fightersInt + creaturesInt

  return (
    <div className={classes.wrapper}>
      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.power,
            barColorPrimary: classes.powerBar,
          }}
          variant="determinate"
          value={(fightersPower / sumPower) * 100}
        />
        <span className={classes.barText}>Sila</span>
        <span className={classes.barTextEnd}>{`${fightersPower}/${sumPower}`}</span>
      </div>

      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.agility,
            barColorPrimary: classes.agilityBar,
          }}
          variant="determinate"
          value={(fightersAgi / sumAgi) * 100}
        />
        <span className={classes.barText}>Obratnost</span>
        <span className={classes.barTextEnd}>{`${fightersAgi}/${sumAgi}`}</span>
      </div>

      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.intelligence,
            barColorPrimary: classes.intelligenceBar,
          }}
          variant="determinate"
          value={(fightersInt / sumInt) * 100}
        />
        <span className={classes.barText}>Inteligencia</span>
        <span className={classes.barTextEnd}>{`${fightersInt}/${sumInt}`}</span>
      </div>
    </div>
  )
}

export default compose(
  connect((state) => ({
    creatures: state.creatures,
    fighters: state.fighters,
  })),
  withStyles(styles)
)(Stats)
