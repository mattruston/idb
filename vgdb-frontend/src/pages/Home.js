import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                {title: "test-item-1", details: ["test", "test", "test"], url:"/games/13"},
                {title: "test-item-2", details: ["test", "test", "test"], url:"/developers/124"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/platforms/125"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/characters/126"}
            ]
        };
    }

    componentWillMount() { 

    }

    render() {
        return (
            <div>
                <div className="container">
                    <Title title="Gamez"/>
                    <GridLayout items={this.state.games} details={[]}/>
                </div>
            </div>
        )
    }
}

export default Home;