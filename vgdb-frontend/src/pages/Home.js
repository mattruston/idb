import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';

class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            testitems: [
                {title: "test-item-1", details: ["test", "test", "test"]},
                {title: "test-item-2", details: ["test", "test", "test"]},
                {title: "test-item-3", details: ["test", "test", "test"]},
                {title: "test-item-3", details: ["test", "test", "test"]},
                {title: "test-item-3", details: ["test", "test", "test"]},
                {title: "test-item-3", details: ["test", "test", "test"]}
            ]
        };
    }
    render() {
        return (
            <div>
                <div className="container">
                    <h1>Home</h1>
                    <GridLayout items={this.state.testitems}/>
                </div>
            </div>
        )
    }
}

export default Home;