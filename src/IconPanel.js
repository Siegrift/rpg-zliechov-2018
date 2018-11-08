import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Tooltip from '@material-ui/core/Tooltip'
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
  tile: {
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
  overlay: {
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
  overlaySelected: {
    backgroundColor: 'rgba(0, 0, 255, 0.4) !important',
  },
})

const SingleLineGridList = ({ classes, className, data, autoresize, onClick, selected }) => {
  return (
    <div className={classNames(classes.root, className)}>
      <GridList className={classes.gridList} cols={data.length}>
        {data.map((tile, i) => (
          <Tooltip key={i} title={tile.title || 'PRISERA'}>
            <GridListTile className={classes.tile} onClick={() => onClick && onClick(i)}>
              <img src={tile.image} alt={tile.title || 'PRISERA'} className={classes.image} />
              <span
                className={classNames(classes.overlay, selected === i && classes.overlaySelected)}
              />
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
