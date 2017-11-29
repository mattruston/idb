import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
    render() {
        return (
            <div className="loading-container">
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>
            </div>
        );
    }
}

export default Loader;