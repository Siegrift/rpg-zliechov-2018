import React from 'react'
import { connect } from 'react-redux'

import CreateDungeon from './CreateDungeon'
import Dungeon from './Dungeon'
import DungeonFighters from './DungeonFighters'
import Fight from './Fight'

const App = ({ page }) => {
  return <Fight />
  switch (page) {
    case 'create':
      return <CreateDungeon />
    case 'dungeon':
      return <Dungeon />
    case 'fighters':
      return <DungeonFighters />
    case 'fight':
      return <Fight />
    default:
      // eslint-disable-next-line
      console.error(`Invalid page name: ${page}`)
      return null
  }
}

export default connect((state) => ({
  page: state.page,
}))(App)
