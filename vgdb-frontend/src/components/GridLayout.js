import React, { Component } from 'react';
import GridItem from './GridItem';
import './GridLayout.css';

/* Multiline flexible column layout for griditems */
class GridLayout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="grid-layout">
                <div className="grid-layout-container"> 
                    <div className="grid"> 
                    {
                        this.props.items.map(item => 
                            <GridItem details={this.props.details} item={item}></GridItem> 
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default GridLayout;