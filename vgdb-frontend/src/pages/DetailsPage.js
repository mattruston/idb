import React, { Component } from 'react';
import SideBarItem from '../components/SideBarItem';
import MainBarItem from '../components/MainBarItem';
import './DetailsPage.css';

class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec est velit. Aenean eu enim augue. Nam imperdiet rhoncus ultricies. Donec eget ex sit amet ipsum bibendum suscipit. Nulla ex risus, lacinia a risus quis, gravida scelerisque nunc. Nullam in consequat velit. Mauris imperdiet tellus et justo viverra pulvinar. Suspendisse potenti. Cras quis purus ante. Nulla ut aliquam libero. Nunc molestie lacus vitae maximus maximus. Nullam ac efficitur lorem, non posuere sem. Vivamus vitae pharetra nisl."
        }
    }
    componentWillUpdate() {
        // Make http request for game
    }
    render() {
        return (
            <div className="container detail-page">
                <div className="sidebar inline-block">
                    <img className="sidebar-img"/>
                    <SideBarItem attribute="title" info="content"/>
                </div><div className="details inline-block">
                    <h1 className="detail-title">{this.props.match.params.id}</h1>
                    <hr></hr>
                    {
                        // Want to be able to loop through details
                    }
                    <MainBarItem attribute="title" info="content"/>
                    <p className="detail-description">
                        {this.state.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default DetailsPage;