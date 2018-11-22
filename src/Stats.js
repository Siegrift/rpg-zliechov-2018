import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import withStatProps from './withStatProps'

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      margin: theme.spacing.unit / 8,
    },
  },
  progressWrapper: {
    height: 20,
  },
  intelligenceBar: {
    backgroundColor: 'rgb(0, 0, 220)',
  },
  int: {
    height: 20,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(0, 0, 110)',
  },
  agilityBar: {
    backgroundColor: 'rgb(0, 220, 0)',
  },
  agi: {
    height: 20,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(0, 110, 0)',
  },
  powerBar: {
    backgroundColor: 'rgb(220, 0, 0)',
  },
  power: {
    height: 20,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(110, 0, 0)',
  },
  barText: {
    color: 'white',
    position: 'relative',
    top: -19,
    left: 9,
  },
  barTextEnd: {
    color: 'white',
    position: 'relative',
    float: 'right',
    top: -19,
    right: 9,
  },
})

const Stats = ({ classes, creaturesPower, creaturesAgi, creaturesInt, initialCreatureStats }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.power,
            barColorPrimary: classes.powerBar,
          }}
          variant="determinate"
          value={(creaturesPower / initialCreatureStats[0]) * 100}
        />
        <span className={classes.barText}>Sila</span>
        <span className={classes.barTextEnd}>{`${creaturesPower}/${initialCreatureStats[0]}`}</span>
      </div>

      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.agi,
            barColorPrimary: classes.agilityBar,
          }}
          variant="determinate"
          value={(creaturesAgi / initialCreatureStats[1]) * 100}
        />
        <span className={classes.barText}>Obratnost</span>
        <span className={classes.barTextEnd}>{`${creaturesAgi}/${initialCreatureStats[1]}`}</span>
      </div>

      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.int,
            barColorPrimary: classes.intelligenceBar,
          }}
          variant="determinate"
          value={(creaturesInt / initialCreatureStats[2]) * 100}
        />
        <span className={classes.barText}>Inteligencia</span>
        <span className={classes.barTextEnd}>{`${creaturesInt}/${initialCreatureStats[2]}`}</span>
      </div>
    </div>
  )
}

export default compose(
  connect((state) => ({
    creatures: state.creatures,
    fighters: state.fighters,
    initialCreatureStats: state.initialCreatureStats,
  })),
  withStatProps,
  withStyles(styles)
)(Stats)
