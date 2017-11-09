import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GridItem.css';

class GridItem extends Component {
    static defaultProps = {
        aspect: "cover"
    };

    constructor(props) {
        super(props);
        this.state = {
            imageStyle: {
                backgroundImage: "url(" + this.props.img + ")",
                backgroundSize: this.props.aspect 
            }
        }
    }
    render() {
        return (
            <Link to={ this.props.url } className="grid-item">
                <div className="grid-item-container">
                    <div className="cover-image" style={this.state.imageStyle}>
                        <div className="item-detail-list">
                            { 
                                this.props.details.map( d => 
                                    <div className="item">
                                        <div className="item-detail-title">{d.title}</div>
                                        <div className="item-detail-content">{d.content}</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="item-detail">
                        <div className="item-title">{ this.props.name.length > 23 ? this.props.name.substring(0, 20) + "..." : this.props.name }</div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default GridItem;