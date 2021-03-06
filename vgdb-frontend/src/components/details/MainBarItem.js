import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BarItem.css';

class MainBarItem extends Component {
    render() {
        return (
            <div className="info-item">
                <div className="bar-item-title inline-block">{this.props.attribute + ": "}</div>
                <div className="bar-item-info inline-block main-info">{this.props.info}</div>
            </div>
        )
    }
}

export default MainBarItem;