import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ /* Home page component */ }/>
          <Route path="/about" component={ /* About page component */ }/>
          <Route path="/games" component={ }/>
          <Route path="/game/:game" component={ }/>
          <Route path="/developers" component={ }/>
          <Route path="/developer/:developer" component={ }/>
          <Route path="/characters" component={ }/>
          <Route path="/character/:character" component={ }/>
          <Route path="/platforms" component={ }/>
          <Route path="/platform/:platform" component={ }/>
          <Route component={ /* not found page*/ }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
