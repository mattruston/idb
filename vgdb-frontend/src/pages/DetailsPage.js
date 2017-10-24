import React, { Component } from 'react';
import SideBarItem from '../components/SideBarItem';
import MainBarItem from '../components/MainBarItem';
import './DetailsPage.css';

class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: ""
        }
    }

    componentDidMount() {
        this._getContent();
    }

    _getContent() {
        let myInit = { method: 'GET',
        mode: 'no-cors'};

        fetch('https://gamingdb.info/api/game/' + this.props.match.params.id, myInit)
        .then((response) => { 
            // console.log(response);
            return response.json();
        }).then((responseJson) => {
            // console.log(responseJson);
            this.setState = {
                title: responseJson.title,
                description: responseJson.description
            };
        }).catch((error) => {
            console.error(error);
        });
    }

    componentWillUpdate() {
        // Make http request for game
        this._getContent();
    }

    render() {
        return (
            <div className="container detail-page">
                <div className="sidebar inline-block">
                    <img className="sidebar-img"/>
                    <SideBarItem attribute="title" info="content"/>
                </div><div className="details inline-block">
                    <h1 className="detail-title">{this.state.title}</h1>
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