import React, { Component } from 'react';
import './ToolCard.css';

class ToolCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: [
                {name: "Trello", description:"Issue tracker"},
                {name: "PlanItPoker", description:"Creating and estimating user stories"},
                {name: "Google Domains", description:"Bought and registered our domain"},
                {name: "Apiary", description:"API Documentation"},
                {name: "Google Cloud Platform", description:"Used App Engine to deploy our site"},
                {name: "Slack", description:"Used for team communication"},
                {name: "Flask", description:"Python server engine to power all the api and forward all non-api routing to React"},
                {name: "React", description:"Frontend engine to power all of our clientside rendering and routing"}
            ]
        };
    }

    render() {
        return (
            <div className="tool-card">
                <div className="tool-content">
                    <div className="name">Tools</div>
                    {
                        this.state.tools.map(tool => 
                            <div className="tool-content-item">
                                <div className="tool-title">{tool.name + ": "}</div>
                                <div className="detail">{tool.description}</div>
                            </div> 
                        )
                    }
                </div>
            </div>
        );
    }
}

export default ToolCard;
