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
import { itemTypes } from './items'

const styles = (theme) => ({
  wrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  card: {
    maxWidth: 900,
    margin: 'auto',
    [theme.breakpoints.down('lg')]: {
      maxWidth: 450,
    },
  },
  media: {
    objectFit: 'cover',
    maxWidth: 700,
    maxHeight: 500,
    [theme.breakpoints.down('lg')]: {
      maxWidth: 450,
      maxHeight: 250,
    },
  },
  listItem: {
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

const formatRewardItems = (rewardItems) => {
  const formattedRewardItems = []
  for (let i = 0; i < rewardItems.length; i++) {
    if (parseInt(rewardItems[i], 10) !== 0) {
      formattedRewardItems.push(`${rewardItems[i]}krát ${itemTypes[i].toLowerCase()}`)
    }
  }
  return formattedRewardItems
}

const Dungeon = ({ name, requirements, imageIndex, classes, updateValue, rewardItems }) => {
  return (
    <div className={classes.wrapper}>
      <Tooltip title="Vyzvať príšeru">
        <Card className={classes.card} onClick={() => updateValue(['page'], 'assemble')}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Príšera"
              className={classes.media}
              image={creatureImages[imageIndex].image}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" className={classes.title}>
                {name}
              </Typography>
              <Divider className={classes.divider} />

              <Typography gutterBottom variant="h6" className={classes.title}>
                Podmienky na vyzvanie
              </Typography>
              <List items={requirements} itemClassName={classes.listItem} />
              <Divider className={classes.divider} />

              <Typography gutterBottom variant="h6" className={classes.title}>
                Odmena
              </Typography>
              <List items={formatRewardItems(rewardItems)} itemClassName={classes.listItem} />
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
