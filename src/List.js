import React from 'react'
import MatList from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const List = ({ items, itemClassName }) => {
  return (
    <MatList component="nav">
      {items.map((req, i) => (
        <ListItem button key={i} className={itemClassName}>
          <ListItemIcon>
            <FiberManualRecordIcon />
          </ListItemIcon>
          <ListItemText primary={req} />
        </ListItem>
      ))}
    </MatList>
  )
}

export default List
