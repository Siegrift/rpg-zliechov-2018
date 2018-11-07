import React from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

const CreateDungeon = () => {
  return (
    <div>
      <Typography component="h2" variant="h1" gutterBottom>
        Vytvor dungeon
      </Typography>
      <div>
        <FormGroup>
          <FormControl>
            <TextField label="Sila" placeholder="Zadaj silu príšery" />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <TextField label="Obratnosť" placeholder="Zadaj obratnosť príšery" />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <TextField label="Inteligencia" placeholder="Zadaj inteligenciu príšery" />
          </FormControl>
        </FormGroup>
        <Button variant="contained" color="primary">
          Vytvor
        </Button>
      </div>
    </div>
  )
}

export default CreateDungeon
