import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav';
import GamesPage from './pages/GamesPage';
import DevPage from './pages/DevPage';
import PlatformsPage from './pages/PlatformsPage';
import CharactersPage from './pages/CharactersPage';
import AboutPage from './pages/About';
import Home from './pages/Home';
import GameDetail from './pages/details/GameDetail';
import PlatformDetail from './pages/details/PlatformDetail';
import DevDetail from './pages/details/DevDetail';
import CharDetail from './pages/details/CharDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Nav/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/games' component={GamesPage}/>
          <Route exact path='/developers'	component={DevPage}/>
          <Route exact path='/platforms' component={PlatformsPage}/>
          <Route exact path='/characters'	component={CharactersPage}/>
          <Route exact path='/about' component={AboutPage}/>
          <Route exact path='/games/:id' component={GameDetail}/>
          <Route exact path='/developers/:id'	component={DevDetail}/>
          <Route exact path='/platforms/:id' component={PlatformDetail}/>
          <Route exact path='/characters/:id'	component={CharDetail}/>
				<div className="footer">
					<a className="link" href="https://github.com/mattruston/idb">Check out the project on Github</a>
				</div>
      </div>
    );
  }
}

export default App;