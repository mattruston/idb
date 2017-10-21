import React, { Component } from 'react';
import './GridItem.css';

class GridItem extends Component {
    render() {
        return (
            <a href="{ this.props.url }" className="grid-item">
                <div className="grid-item-container">
                    <div className="cover-image">
                        <div className="item-detail-list">
                            { 
                                this.props.details.map( item => 
                                    <div className="item" key={ item }>
                                        { item }
                                    </div>
                                )
                            }
                        </div>
                        
                    </div>
                    <div className="item-detail">
                        <div className="item-title">{this.props.title}</div>
                    </div>
                </div>
            </a>
        );
    }
}

export default GridItem;