import React, { Component } from 'react';
import './ToolCard.css';

class ToolCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let items = this.props.list.map((item) => {
            if(item.hasOwnProperty("url")) {
                return <div><div className="tool-title">{item.name + ": "}</div><a className="detail" href={item.url}>{item.description}</a></div>
            } else {
                return <div><div className="tool-title">{item.name + ": "}</div><div className="detail">{item.description}</div></div>
            }
        });
        return (
            <div className="tool-card">
                <div className="tool-content">
                    <div className="name">{this.props.title}</div>
                    { items }
                </div>
            </div>
        );
    }
}

export default ToolCard;
