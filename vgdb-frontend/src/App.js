import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import GamesPage from './pages/GamesPage';
import DevPage from './pages/DevPage';
import PlatformsPage from './pages/PlatformsPage';
import CharactersPage from './pages/CharactersPage';
import AboutPage from './pages/About';
import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Nav/>
        <BrowserRouter>
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/games' component={GamesPage}/>
              <Route exact path='/developers'	component={DevPage}/>
              <Route exact path='/platforms' component={PlatformsPage}/>
              <Route exact path='/characters'	component={CharactersPage}/>
              <Route exact path='/about' component={AboutPage}/>
              {/* <Route exact path='/games/:game'						component={Game}/>
              <Route exact path='/developers/:developer'	component={Developer}/>
              <Route exact path='/platforms/:platform'		component={Platform}/>
              <Route exact path='/characters/:character'	component={Character}/> */}
          </Switch>
        </BrowserRouter>
				<div className="footer">
					<a class="link" href="https://github.com/mattruston/idb">Check out the project on Github</a>
				</div>
      </div>
    );
  }
}

export default App;
