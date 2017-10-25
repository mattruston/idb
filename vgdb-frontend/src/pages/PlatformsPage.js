import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';

class PlatformsPage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            testitems: [
                {title: "test-item-1", details: ["test", "test", "test"], url:"/games"},
                {title: "test-item-2", details: ["test", "test", "test"], url:"/games"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/games"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/games"}
            ]
        };
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Title title="Platforms"/>
                    <GridLayout items={this.state.testitems}  details={[]}/>
                </div>
            </div>
        )
    }
}

export default PlatformsPage;