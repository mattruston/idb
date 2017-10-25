import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
    render() {
        return (
            <div class="sk-folding-cube">
                <div class="sk-cube1 sk-cube"></div>
                <div class="sk-cube2 sk-cube"></div>
                <div class="sk-cube4 sk-cube"></div>
                <div class="sk-cube3 sk-cube"></div>
            </div>
        );
    }
}

export default Loader;