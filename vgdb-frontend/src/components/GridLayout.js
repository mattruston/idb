import React, { Component } from 'react';
import GridItem from './GridItem';
import './GridLayout.css';

/* Multiline flexible column layout for griditems */
class GridLayout extends Component {
    render() {
        return (
            <div className="grid-layout">
                <div className="grid-layout-container"> 
                    <div className="grid"> 
                    {
                        this.props.items.map(item => 
                            <GridItem key={item.title} details={item.details} name={item.name} img={item.img} url={item.url}/>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default GridLayout;