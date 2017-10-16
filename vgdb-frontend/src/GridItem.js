import React, { Component } from 'react';

class GridItem extends Component {
    render() {
        return (
            <a href="{ this.props.url }" className="grid-item" >
                <div className="info-cover">
                    <div className="title"></div>
                    <hr></hr>
                    { this.props.items.map( item => 
                        <div className="item" key={ item }>
                            { item }
                        </div> )}
                </div>
            </a>
        );
    }
}

export default GridItem;