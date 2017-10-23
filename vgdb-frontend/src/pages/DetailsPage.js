import React, { Component } from 'react';
import SideBarItem from '../components/SideBarItem';
import MainBarItem from '../components/MainBarItem';

class DetailsPage extends Component {
    constructor(props) {
        super(props)
    }
    componentWillUpdate() {
        // Make http request for game
    }
    render() {
        return (
            <div className="container">
                <div className="sidebar">
                    <img className="sidebar-img"/>
                    {
                        // Want to be able to loop through details
                    }
                </div>
                <div className="details">
                    <h1 className="title">{this.props.match.params.id}</h1>
                    <hr></hr>
                    {
                        // Want to be able to loop through details
                    }
                    <p className="description">

                    </p>
                </div>
            </div>
        );
    }
}

export default DetailsPage;