import React, { Component } from 'react';

/* Link or Text item on the nav */
class NavItem extends Component {
    render() {
        return (
            /* Probably needs to be a router-link or something */
            <a className="nav-item" href={this.props.link}> 
                <div className="nav-item-text"> {this.props.text} </div>
            </a>
        );
    }
}

export default NavItem;