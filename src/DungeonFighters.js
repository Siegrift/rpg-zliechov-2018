import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import FormLabel from '@material-ui/core/FormLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'

import IconPanel from './IconPanel'
import EntityImage from './EntityImage'
import { mageImages, addEntityImage, itemImages, spellImages } from './images'

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing.unit,
  },
  fightersPanel: {
    height: '70%',
  },
  form: {
    marginTop: theme.spacing.unit / 2,
    border: '1px solid rgba(0, 0, 0, 0.2)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing.unit / 2,
  },
  image: {
    maxHeight: '500px',
    margin: 'auto',
    maxWidth: '80%',
  },
  fighterDetails: {
    display: 'flex',
    '& > div': {
      width: '50%',
      margin: 'auto',
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  fighterDetailsForm: {
    '& > *': {
      margin: theme.spacing.unit / 8,
    },
  },
  formField: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  divider: {
    marginTop: theme.spacing.unit / 4,
    marginBottom: theme.spacing.unit / 4,
  },
  button: {
    margin: 'auto',
    display: 'block',
  },
})

const fightersData = [...mageImages, addEntityImage]

const itemsData = [...itemImages, addEntityImage]

const DungeonFighters = ({ classes, onSelect }) => {
  return (
    <div className={classes.wrapper}>
      <IconPanel data={fightersData} />

      <div className={classes.form}>
        <Typography component="h4" variant="h4" gutterBottom className={classes.title}>
          Nový bojovník
        </Typography>

        <div className={classes.fighterDetails}>
          <div className={classes.fighterDetailsForm}>
            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField label="Nick" placeholder="Zadaj svoj nick" />
              </FormControl>
            </FormGroup>
            <FormControl className={classes.formField}>
              <InputLabel htmlFor="choose-race">Rasa</InputLabel>
              <Select
                value={10}
                onChange={onSelect}
                inputProps={{
                  name: 'race',
                  id: 'choose-race',
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField label="Level" placeholder="Zadaj svoj level" />
              </FormControl>
            </FormGroup>
            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField label="Sila" placeholder="Zadaj svoju silu" />
              </FormControl>
            </FormGroup>
            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField label="Obratnosť" placeholder="Zadaj svoju obratnosť" />
              </FormControl>
            </FormGroup>
            <FormGroup className={classes.formField}>
              <FormControl>
                <TextField label="Inteligencia" placeholder="Zadaj svoju inteligenciu" />
              </FormControl>
            </FormGroup>
          </div>
          <EntityImage imageClassName={classes.image} />
        </div>
        <Divider className={classes.divider} />
        <div>
          <FormLabel component="legend">Kúzla</FormLabel>
          <IconPanel data={spellImages} />
        </div>
        <Divider className={classes.divider} />

        <div>
          <FormLabel component="legend">Predmety</FormLabel>
          <IconPanel data={itemsData} />
        </div>
        <Divider className={classes.divider} />

        <Button variant="contained" color="primary" className={classes.button}>
          Pridaj
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(DungeonFighters)
