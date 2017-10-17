import React, { Component } from 'react';
import NavItem from './NavItem';

/* Nav component for a standard style navbar */
class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <div className="container">
                    <div className="nav-start">
                        <div className="nav-logo"></div>
                    </div>
                    <div className="nav-end">
                        <div className="nav-menu">
                            <NavItem text="" link=""></NavItem>
                            <NavItem text="" link=""></NavItem>
                            <NavItem text="" link=""></NavItem>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;