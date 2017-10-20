import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import './App.css';

import GridItem from './GridItem';
import Nav from './Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
				<Nav/>
        <GridItem details={['hi', 'there']}></GridItem>
				<Switch>
				{/*	
					<Route exact path='/' 											component={Home}/>
					<Route exact path='/games'									component={GamesPage}/>
					<Route exact path='/developers'							component={DevelopersPage}/>
					<Route exact path='/platforms'							component={PlatformsPage}/>
					<Route exact path='/characters'							component={CharactersPage}/>
					<Route exact path='/about'									component={AboutPage}/>
					<Route exact path='/games/:game'						component={Game}/>
					<Route exact path='/developers/:developer'	component={Developer}/>
					<Route exact path='/platforms/:platform'		component={Platform}/>
					<Route exact path='/characters/:character'	component={Character}/>
				*/}	
				</Switch>
				<div className="footer">
					<a class="link" href="https://github.com/mattruston/idb">Check out the project on Github</a>
				</div>
      </div>
    );
  }
}

export default App;
