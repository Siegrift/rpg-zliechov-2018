import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

import { withStyles } from '@material-ui/core/styles'

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

const Stats = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.power,
            barColorPrimary: classes.powerBar,
          }}
          variant="determinate"
          value={25}
        />
        <span className={classes.barText}>Sila</span>
        <span className={classes.barTextEnd}>1500/6000</span>
      </div>

      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.agility,
            barColorPrimary: classes.agilityBar,
          }}
          variant="determinate"
          value={50}
        />
        <span className={classes.barText}>Obratnost</span>
        <span className={classes.barTextEnd}>3000/6000</span>
      </div>

      <div className={classes.progressWrapper}>
        <LinearProgress
          classes={{
            colorPrimary: classes.intelligence,
            barColorPrimary: classes.intelligenceBar,
          }}
          variant="determinate"
          value={75}
        />
        <span className={classes.barText}>Inteligencia</span>
        <span className={classes.barTextEnd}>4500/6000</span>
      </div>
    </div>
  )
}

export default withStyles(styles)(Stats)
