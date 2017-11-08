import React, { Component } from 'react';
import './AboutCard.css';

class AboutCard extends Component {
    render() {
        return (
            <a className="about-card" href={this.props.url} target="_blank">
                <div className="about-img">
                    <img src={this.props.image}/>
                </div>
                <div className="about-content">
                    <div className="name">{this.props.name}</div>
                    <div className="about-content-item description">
                        <div className="detail">{this.props.description}</div>
                    </div>
                    <div className="about-content-item">
                        <div className="about-title">Responsibilities:</div>
                        <div className="detail">{this.props.roles}</div>
                    </div>
                    <div className="about-content-item">
                        <div className="about-title">Commits:</div>
                        <div className="detail">{this.props.commits}</div>
                    </div>
                    <div className="about-content-item">
                        <div className="about-title">Issues:</div>
                        <div className="detail">{this.props.issues}</div>
                    </div>
                    <div className="about-content-item">
                        <div className="about-title">Unit Tests:</div>
                        <div className="detail">{this.props.tests}</div>
                    </div>
                </div>
            </a>
        );
    }
}

export default AboutCard;