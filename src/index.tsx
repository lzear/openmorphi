import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { createRoot } from 'react-dom/client'
const Main = styled.div`
  margin-bottom: 200px;
`

const container = document.getElementById('root')

if (!container) throw new Error('No container found')

const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <WithOpenMoji>
      <WithSpeed>
        <Main>
          <ApolloProvider client={client}>
            <Routes>
              <Route path="/create" element={<App />}></Route>
              <Route path="/animations" element={<Animations />}></Route>
              <Route path="/infinite" element={<Infinite />}></Route>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </ApolloProvider>
        </Main>
        <Footer />
      </WithSpeed>
    </WithOpenMoji>
  </BrowserRouter>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
