import 'babel-polyfill'
import 'react-app-polyfill/ie9'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'

import { LoginCallback } from 'views'
import { PrivateRoute } from 'components'
import Home from 'screens/HomeScreen/HomeScreen'
import Search from 'screens/SearchScreen/SearchScreen'
import Artist from 'screens/ArtistScreen/ArtistScreen'
import registerServiceWorker from 'registerServiceWorker'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login/callback" component={LoginCallback} />
      <PrivateRoute path="/artist/:id" component={Artist} />
      <PrivateRoute path="/buscar" component={Search} />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  </Router>,
  document.getElementById('root'),
)

registerServiceWorker()
