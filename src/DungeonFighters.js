import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import IconPanel from './IconPanel'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

const DungeonFighters = ({ classes }) => {
  return (
    <div>
      <Typography component="h2" variant="h1" gutterBottom>
        Bojovníci
      </Typography>
      <IconPanel />

      <div>
        <Typography component="h4" variant="h4" gutterBottom>
          Pridaj bojovníka
        </Typography>
        <Divider light />

        <FormGroup>
          <FormControl>
            <TextField label="Nick" placeholder="Zadaj svoj nick" />
          </FormControl>
        </FormGroup>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="choose-race">Rasa</InputLabel>
          <Select
            /* TODO value={this.state.age}*/
            /* TODO onChange={this.handleChange}*/
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
        <FormGroup>
          <FormControl>
            <TextField label="Level" placeholder="Zadaj svoj level" />
          </FormControl>
        </FormGroup>
        {/* TODO ICON*/}
        <Divider />

        <FormGroup>
          <FormControl>
            <TextField label="Sila" placeholder="Zadaj svoju silu" />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <TextField label="Obratnosť" placeholder="Zadaj svoju obratnosť" />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <TextField label="Inteligencia" placeholder="Zadaj svoju inteligenciu" />
          </FormControl>
        </FormGroup>
        <Divider />

        <IconPanel />
        <Divider />

        <IconPanel />
        <Divider />

        <Button variant="contained" color="primary">
          Pridaj
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(DungeonFighters)
