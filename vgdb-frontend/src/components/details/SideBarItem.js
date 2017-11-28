import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BarItem.css';

class SideBarItem extends Component {
    render() {
        return (
            <div className="info-item">
                <div className="bar-item-title">{this.props.attribute}</div>
                    {this.props.url && 
                        <Link to={this.props.url} className="bar-item-info">{this.props.info}</Link>
                    }
                    {!this.props.url &&
                        <div className="bar-item-info">{this.props.info}</div>
                    }
            </div>
        )
    }
}

export default SideBarItem;