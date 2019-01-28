import React from "react"
import ReactDOM from "react-dom"
import ApolloClient from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { ApolloProvider } from "react-apollo"
import {
  BrowserRouter as Router,
  Route,
  Link,
  HashRouter,
  Switch
} from "react-router-dom"
import { InMemoryCache } from "apollo-cache-inmemory"

import "semantic-ui-css/semantic.min.css"
import "./index.css"

import App from "./App"
import Login from "./components/LoginForm"
import Signup from "./components/SignupForm"
import EditForm from "./components/editForm"

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  dataIdFromObject: o => o.id,
  fetchOptions: {
    mode: "no-cors"
  }
})

const Splash = () => {
  return <div>Spalsh</div>
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" exact component={Splash} />
          <Route path="/login/" component={Login} />
          <Route path="/signup/" component={Signup} />
          <Route path="/edit/:id" component={EditForm} />
          <Route component={App} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById("root"))
