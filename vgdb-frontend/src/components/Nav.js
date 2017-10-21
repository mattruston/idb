import React, { Component } from 'react';
import '../App.css';
import NavItem from './NavItem';

/* Nav component for a standard style navbar */
class Nav extends Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark justify-content-between">
			<div class="container">
				<a class="navbar-brand primary-text" href="/">gamingdb</a>
				
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					{/* <form class="d-flex flex-row nav-input-group">
						<input class="form-control nav-input" type="text" placeholder="Search" aria-label="Search"/>
					    <button class="btn nav-input-button" type="submit">Search</button>
					</form> */}
					<div class="d-inline-flex flex-row justify-content-end w-100">
						<NavItem text="Games" link="/games"/>
                        <NavItem text="Developers" link="/developers"/>
                        <NavItem text="Platforms" link="/platforms"/>
                        <NavItem text="Characters" link="/characters"/>
                        <NavItem text="About" link="/about"/>
					</div>
				    
				</div>
			</div>
		</nav>
            /*<div className="nav">
                <div className="container">
                    <div className="nav-start">
                        <div className="nav-logo"></div>
                    </div>
                    <div className="nav-end">
                        <div className="nav-menu">
                            <NavItem text="Games" link="/games"/>
                            <NavItem text="Developers" link="/developers"/>
                            <NavItem text="Platforms" link="/platforms"/>
			    <NavItem text="Characters" link="/characters"/>
                        </div>
                    </div>
                </div>
            </div>*/
        );
    }
}

export default Nav;


