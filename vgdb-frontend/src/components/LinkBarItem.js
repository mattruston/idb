import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BarItem.css';

class LinkBarItem extends Component {
    render() {
        return (
            <div className="info-item">
                <div className="bar-item-title">{this.props.attribute}</div>

                   {this.props.links.map(item => 
                            <Link to={item.link} className="bar-item-info"> {item.text}</Link>
                            )
                   }
            </div>
        )
    }
}

export default LinkBarItem;