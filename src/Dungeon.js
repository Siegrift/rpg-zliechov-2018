import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import MonsterImage from './assets/creatures/monster2.png'

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
  },
  card: {
    maxWidth: '30%',
    margin: 'auto',
    marginTop: '5em',
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  button: {
    width: '100%',
  },
}

const Dungeon = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            image={MonsterImage}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="large" color="primary" className={classes.button}>
            Vyzvať na súboj
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(Dungeon)
