import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { WithOpenMoji } from './withOpenMoji'
import { WithSpeed } from './views/CreateAnimation/SpeedContext'
import Home from './views/Home'
import Animations from './views/Animation'
import Footer from './views/Footer'
import styled from 'styled-components'
import { client } from './utils/apollo'
import Infinite from './components/Infinite'
const Main = styled.div`
  margin-bottom: 200px;
`
ReactDOM.render(
  <BrowserRouter>
    <WithOpenMoji>
      <WithSpeed>
        <Main>
          <ApolloProvider client={client}>
            <Switch>
              <Route path="/create">
                <App />
              </Route>
              <Route path="/animations">
                <Animations />
              </Route>
              <Route path="/infinite">
                <Infinite />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </ApolloProvider>
        </Main>
        <Footer />
      </WithSpeed>
    </WithOpenMoji>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
