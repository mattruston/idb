import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavItem.css';

/* Link or Text item on the nav */
class NavItem extends Component {
    static defaultProps = {
        bold: false
    }
    render() {
        return (
            /* Probably needs to be a router-link or something */
            <Link className="nav-item" to={this.props.link}> 
                <div className={"nav-link " + (this.props.bold ? 'nav-link-bold' : '')}> 
                    {this.props.text} 
                </div>
            </Link>
        );
    }
}

export default NavItem;