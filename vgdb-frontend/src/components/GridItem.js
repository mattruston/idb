import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GridItem.css';

class GridItem extends Component {
    render() {
        return (
            <Link to={ this.props.item.url } className="grid-item">
                <div className="grid-item-container">
                    <div className="cover-image">
                        <div className="item-detail-list">
                            { 
                                this.props.details.map( key => 
                                    <div className="item" className={this.props.item[key]}>
                                        {this.props.item[key]}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="item-detail">
                        <div className="item-title">{this.props.item.title}</div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default GridItem;