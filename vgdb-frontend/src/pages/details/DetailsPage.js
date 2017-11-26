import React, { Component } from 'react';
import SideBarItem from '../../components/SideBarItem';
import MainBarItem from '../../components/MainBarItem';
import LinkBarItem from '../../components/LinkBarItem';
import GridLayout from '../../components/GridLayout';
import './DetailsPage.css';

const placeholder = require('../../assets/imgholder.png');

class DetailsPage extends Component {
    render() {
        return (
            <div>
                <div className="container detail-page">
                    <div className="sidebar inline-block">
                        <img className="sidebar-img" src={ this.props.img === null ? placeholder : this.props.img }/>
                        {
                            this.props.sidebar.filter(item => item.content).map(item => 
                                <SideBarItem attribute={item.title} info={item.content}/>
                            )
                        }
                        {
                            this.props.linkbar.filter(item => item.links.length !== 0).map(item => 
                                <LinkBarItem attribute={item.title} links={item.links}/>
                            )
                        }

                        
                    </div><div className="details inline-block">
                        <h1 className="detail-title">{this.props.name}</h1>
                        <hr></hr>
                        {
                            this.props.mainbar.filter(item => item.content).map(item => 
                                <MainBarItem attribute={item.title} info={item.content}/>
                            )
                        }
                        <p className="detail-description">
                            {this.props.description}
                        </p>
                        
                        
                    </div>
                    
                </div>
                {this.props.games.length &&
                    <div className="container detail-game-list">
                        <h3 className="detail-subtitle">{this.props.gamesTitle}</h3>
                        <GridLayout items={this.props.games}/>
                    </div>
                }
            </div>
        );
    }
}

export default DetailsPage;