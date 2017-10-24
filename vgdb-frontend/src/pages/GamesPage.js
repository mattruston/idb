import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';

class GamesPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            testitems: [
                {title: "test-item-1", details: ["test", "test", "test"], url:"/games/13"},
                {title: "test-item-2", details: ["test", "test", "test"], url:"/games/124"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/games/125"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/games/126"}
            ]
        };
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Title title="Games"/>
                    <GridLayout items={this.state.testitems}/>
                </div>
            </div>
        )
    }
}

export default GamesPage;