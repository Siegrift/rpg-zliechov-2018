import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

import { withStyles } from '@material-ui/core/styles'

const styles = {
  intelligenceBar: {
    backgroundColor: 'blue',
  },
  intelligence: {
    backgroundColor: 'black',
  },
  agilityBar: {
    backgroundColor: 'green',
  },
  agility: {
    backgroundColor: 'black',
  },
  powerBar: {
    backgroundColor: 'red',
  },
  power: {
    backgroundColor: 'black',
  },
}

const Stats = ({ classes }) => {
  return (
    <div>
      <LinearProgress
        classes={{
          colorPrimary: classes.power,
          barColorPrimary: classes.powerBar,
        }}
        variant="determinate"
        value="25"
      />
      <LinearProgress
        classes={{
          colorPrimary: classes.agility,
          barColorPrimary: classes.agilityBar,
        }}
        variant="determinate"
        value="50"
      />
      <LinearProgress
        classes={{
          colorPrimary: classes.intelligence,
          barColorPrimary: classes.intelligenceBar,
        }}
        variant="determinate"
        value="75"
      />
    </div>
  )
}

export default withStyles(styles)(Stats)
