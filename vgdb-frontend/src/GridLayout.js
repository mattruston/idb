import React, { Component } from 'react';
import GridItem from './GridItem';

/* Multiline flexible column layout for griditems */
class GridLayout extends Component {
    render() {
        return (
            <div className="grid-layout">
                <div className="container"> 
                    <div className="grid"> 
                    {this.props.items.map(item => 
                        <GridItem details={item.details} title={item.title}></GridItem> 
                    )}
                    </div>
                </div>
            </div>
        );
    }
}

export default GridLayout;