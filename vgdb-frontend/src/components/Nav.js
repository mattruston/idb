import React, { Component } from 'react';
import './Nav.css';
import NavItem from './NavItem';

/* Nav component for a standard style navbar */
class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <div className="container nav-container">
                    <div className="nav-start nav-section">
                        <NavItem text="gamingdb" link="/" bold={true}/>
                    </div>
                    <div className="nav-end nav-section">
                        <div className="nav-menu">
                            <NavItem text="Games" link="/games"/>
                            <NavItem text="Developers" link="/developers"/>
                            <NavItem text="Platforms" link="/platforms"/>
                            <NavItem text="Characters" link="/characters"/>
                            <NavItem text="About" link="/about"/>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;


