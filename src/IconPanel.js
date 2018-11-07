import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import AddIcon from '@material-ui/icons/Add'
import classNames from 'classnames'

import Image0 from './assets/creatures/monster0.jpg'
import Image1 from './assets/creatures/monster1.jpg'
import Image2 from './assets/creatures/monster2.png'
import Image3 from './assets/creatures/monster3.jpeg'
import Add from './assets/add.png'

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
  title: {
    color: theme.palette.primary.light,
    fontSize: '1.5em',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0) 100%)',
  },
})

const tileData = [
  {
    img: Image0,
    title: 'Image0',
    author: 'author0',
  },
  {
    img: Image1,
    title: 'Image1',
    author: 'author1',
  },
  {
    img: Image2,
    title: 'Image2',
    author: 'author2',
  },
  {
    img: Image3,
    title: 'Image3',
    author: 'author3',
  },
  {
    img: Add,
    title: 'Image3',
    author: 'author3',
  },
]

const SingleLineGridList = ({ classes, className }) => {
  return (
    <div className={classNames(classes.root, className)}>
      <GridList className={classes.gridList} cols={tileData.length}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SingleLineGridList)
