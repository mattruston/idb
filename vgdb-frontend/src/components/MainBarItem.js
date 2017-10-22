import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainBarItem extends Component {
    render() {
        return (
            <div class="info-item">
                <div class="title">{this.props.attribute + ": "}
                {this.props.url && 
                        <Link to={this.props.url} class="info">{this.props.info}</Link>
                }
                {!this.props.url &&
                    <div class="info">{this.props.info}</div>
                }
                </div>
            </div>
        )
    }
}

export default MainBarItem;