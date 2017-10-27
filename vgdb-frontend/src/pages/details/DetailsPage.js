import React, { Component } from 'react';
import SideBarItem from '../../components/SideBarItem';
import MainBarItem from '../../components/MainBarItem';
import LinkBarItem from '../../components/LinkBarItem';
import './DetailsPage.css';

class DetailsPage extends Component {
    render() {
        return (
            <div className="container detail-page">
                <div className="sidebar inline-block">
                    <img className="sidebar-img" src={this.props.img}/>
                    {
                        this.props.sidebar.map(item => 
                            <SideBarItem attribute={item.title} info={item.content}/>
                        )
                    }
                    {
                        this.props.linkbar.map(item => 
                            <LinkBarItem attribute={item.title} links={item.links}/>
                        )
                    }

                    
                </div><div className="details inline-block">
                    <h1 className="detail-title">{this.props.title}</h1>
                    <hr></hr>
                    {
                        this.props.mainbar.map(item => 
                            <MainBarItem attribute={item.title} info={item.content}/>
                        )
                    }
                    <p className="detail-description">
                        {this.props.description}
                    </p>
                </div>
            </div>
        );
    }
}

export default DetailsPage;