import React, { Component } from 'react';
import './App.css';

/* Link or Text item on the nav */
class NavItem extends Component {
    render() {
        return (
            /* Probably needs to be a router-link or something */
            <a className="nav-item" href={this.props.link}> 
                <div className="nav-link"> {this.props.text} </div>
            </a>
        );
    }
}

export default NavItem;