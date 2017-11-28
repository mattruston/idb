import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BarItem.css';

class LinkBarItem extends Component {
    render() {
        return (
            <div className="info-item">
                <div className="bar-item-title">{this.props.attribute}</div>

                   {this.props.links.filter(link => !link.external).map(item => 
                            <div className="bar-item-info"><Link to={item.link}> {item.text}</Link></div>
                            )
                   }
                   {this.props.links.filter(link => link.external).map(item => 
                            <div className="bar-item-info"><a href={item.link} className="bar-item-info"> {item.text}</a></div>
                            )
                   }
            </div>
        )
    }
}

export default LinkBarItem;