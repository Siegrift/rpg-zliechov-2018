import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListTile: {
    borderRadius: theme.shape.borderRadius,
    '& > *': {
      borderRadius: theme.shape.borderRadius,
    },
    cursor: 'pointer',
    maxWidth: '120px',
    maxHeight: '120px',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: '1.2em',
  },
  titleWrap: {
    textAlign: 'center',
    margin: 'auto',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)',
  },
  x: {
    backgroundColor: 'rgb(0, 0, 0, 0)',
    display: 'inline-block',
    height: '1500px',
    width: '1500px',
    position: 'relative',
    bottom: '1500px',
    marginBottom: '-1500px',
    zIndex: 2,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
})

const SingleLineGridList = ({ classes, className, data, autoresize }) => {
  return (
    <div className={classNames(classes.root, className)}>
      <GridList className={classes.gridList} cols={data.length}>
        {data.map((tile, i) => (
          <Tooltip key={i} title={tile.title || 'PRISERA'}>
            <GridListTile className={classes.gridListTile}>
              <img src={tile.image} alt={tile.title || 'PRISERA'} className={classes.image} />
              <span className={classes.x} />
              <GridListTileBar
                title={tile.title || 'PRISERA'}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                  titleWrap: classes.titleWrap,
                }}
              />
            </GridListTile>
          </Tooltip>
        ))}
      </GridList>
    </div>
  )
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SingleLineGridList)
