import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import TeamView from './TeamView'
import Stats from './Stats'

const styles = (theme) => ({
  divider: {
    borderLeft: '2px solid red',
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

const Fight = ({ classes }) => {
  return (
    <React.Fragment>
      <Stats />
      <div className={classes.panel}>
        <TeamView />
        <div className={classes.divider} />
        <TeamView />
      </div>
    </React.Fragment>
  )
}

export default withStyles(styles)(Fight)
