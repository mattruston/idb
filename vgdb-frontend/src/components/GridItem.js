import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GridItem.css';

const placeholder = require('../assets/imgholder.png');

class GridItem extends Component {
    static defaultProps = {
        aspect: "cover",
    };

    constructor(props) {
        super(props);

        // Check if the img value is null; if so we need to input placeholder
        let img = this.props.img;
        let empty = false;
        if(img == null) {
            img = placeholder;
            empty = true;
        }

        this.state = {
            imageStyle: {
                backgroundImage: "url(" + img + ")",
                // Use the given backgroundSize unless using placeholder
                backgroundSize: empty ? "cover" : this.props.aspect 
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
                                    <div key={d.title} className="item">
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