import 'typeface-roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store/configureStore'
import './index.css'

const store = configureStore()
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  spacing: {
    unit: 32,
  },
  shape: {
    borderRadius: 8,
  },
  /*breakpoints: {
    values: {
      md: 1300,
      lg: 2000,
    },
  },*/
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
