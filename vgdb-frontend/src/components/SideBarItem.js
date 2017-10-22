import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBarItem extends Component {
    render() {
        return (
            <div class="info-item">
                <div class="title">{this.props.attribute}</div>
                    {this.props.url && 
                        <Link to={this.props.url} class="info">{this.props.info}</Link>
                    }
                    {!this.props.url &&
                        <div class="info">{this.props.info}</div>
                    }
            </div>
        )
    }
}

export default SideBarItem;