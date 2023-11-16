/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'

const root = document.getElementById('root')
import { Router } from '@solidjs/router'

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
)
