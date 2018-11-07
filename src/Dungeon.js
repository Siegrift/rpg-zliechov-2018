import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { withStyles } from '@material-ui/core/styles'

import MonsterImage from './assets/creatures/monster2.png'

const styles = (theme) => ({
  wrapper: {
    width: '100%',
    height: '100%',
  },
  card: {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '5em',
  },
  media: {
    objectFit: 'cover',
  },
  requirement: {
    padding: theme.spacing.unit / 8,
  },
  divider: {
    marginTop: theme.spacing.unit / 4,
    marginBottom: theme.spacing.unit / 4,
  },
  title: {
    textAlign: 'center',
  },
})

const requirements = ['Aspoň 5 ľudia', 'Dokopy 500 sily']

const Dungeon = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <Tooltip title="Vyzvať príšeru">
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Príšera"
              className={classes.media}
              image={MonsterImage}
              title="Príšera"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                Meno príšery
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
              <Divider className={classes.divider} />

              <Typography gutterBottom variant="h6" component="h3" className={classes.title}>
                Podmienky na vyzvanie
              </Typography>
              <List component="nav">
                {requirements.map((req, i) => (
                  <ListItem button key={i} className={classes.requirement}>
                    <ListItemIcon>
                      <FiberManualRecordIcon />
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </CardActionArea>
        </Card>
      </Tooltip>
    </div>
  )
}

export default withStyles(styles)(Dungeon)
