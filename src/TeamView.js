import React from 'react'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

import IconPanel from './IconPanel'

const styles = (theme) => ({
  wrapper: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    width: `calc(50% - ${theme.spacing.unit}px)`,
    marginTop: theme.spacing.unit / 2,
  },
  heroDetails: {
    display: 'flex',
    marginTop: theme.spacing.unit / 2,
    marginBottom: theme.spacing.unit / 2,
  },
  formPanel: {
    width: '50%',
    margin: 'auto',
    '& > div': {
      marginTop: theme.spacing.unit / 4,
      marginBottom: theme.spacing.unit / 4,
    },
  },
  image: {
    margin: 'auto',
    width: '50%',
    height: '50%',
  },
})

const TeamView = ({ classes, className, entityData, spellData, itemData, selected }) => {
  return (
    <div className={classNames(classes.wrapper, className)}>
      <IconPanel data={entityData} />
      <div className={classes.heroDetails}>
        <div className={classes.formPanel}>
          <FormGroup>
            <FormControl>
              <TextField label="Sila" value={Math.ceil(Math.random() * 1000)} />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField label="Obratnosť" value={Math.ceil(Math.random() * 1000)} />
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl>
              <TextField label="Inteligencia" value={Math.ceil(Math.random() * 1000)} />
            </FormControl>
          </FormGroup>
          <IconPanel data={spellData} maxSize="40" />
        </div>
        <img src={entityData[selected].image} className={classes.image} alt="Fighter image" />
      </div>
      <IconPanel data={itemData} />
    </div>
  )
}

export default withStyles(styles)(TeamView)
