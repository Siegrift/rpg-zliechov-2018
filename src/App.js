import React from 'react'
import { connect } from 'react-redux'

import CreateDungeon from './CreateDungeon'
import Dungeon from './Dungeon'
import DungeonFighters from './DungeonFighters'
import CreatureBuff from './CreatureBuff'
import Fight from './Fight'

const App = ({ page }) => {
  switch (page) {
    case 'create':
      return <CreateDungeon />
    case 'dungeon':
      return <Dungeon />
    case 'assemble':
      return <DungeonFighters />
    case 'creature_buff':
      return <CreatureBuff />
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
