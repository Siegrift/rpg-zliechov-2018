import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import List from './List'
import { updateValue as _updateValue } from './actions'
import { creatureImages } from './units'

const styles = (theme) => ({
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  card: {
    maxWidth: 1000,
    margin: 'auto',
    [theme.breakpoints.down('lg')]: {
      maxWidth: 500,
    },
  },
  media: {
    objectFit: 'cover',
    maxWidth: 1000,
    maxHeight: 600,
    [theme.breakpoints.down('lg')]: {
      maxWidth: 500,
      maxHeight: 400,
    },
  },
  requirement: {
    padding: theme.spacing.unit / 8,
    backgroundColor: 'transparent !important',
  },
  divider: {
    marginTop: theme.spacing.unit / 4,
    marginBottom: theme.spacing.unit / 4,
  },
  title: {
    textAlign: 'center',
  },
})

const Dungeon = ({ name, requirements, imageIndex, classes, updateValue }) => {
  return (
    <div className={classes.wrapper}>
      <Tooltip title="Vyzvať príšeru">
        <Card className={classes.card} onClick={() => updateValue(['page'], 'fighters')}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Príšera"
              className={classes.media}
              image={creatureImages[imageIndex].image}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                {name}
              </Typography>
              <Divider className={classes.divider} />

              <Typography gutterBottom variant="h6" component="h3" className={classes.title}>
                Podmienky na vyzvanie
              </Typography>
              <List items={requirements} itemClassName={classes.requirement} />
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
    </div>
  )
}

export default compose(
  connect(
    (state) => ({
      ...state.creatures[0],
    }),
    {
      updateValue: _updateValue,
    }
  ),
  withStyles(styles)
)(Dungeon)
