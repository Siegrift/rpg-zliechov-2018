import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import TeamView from './TeamView'
import Stats from './Stats'

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
})

const Fight = ({ classes, creatures, fighters }) => {
  return (
    <div className={classes.wrapper}>
      <Stats />
      <div className={classes.panel}>
        <TeamView />
        <div className={classes.divider} />
        <TeamView isCreatureView />
      </div>
    </div>
  )
}

export default withStyles(styles)(Fight)
