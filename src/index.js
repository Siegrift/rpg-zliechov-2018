import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import App from './App'
import './index.css'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
