import React, { Component } from 'react';
import GridItem from './GridItem';
import './GridLayout.css';

/* Multiline flexible column layout for griditems */
class GridLayout extends Component {
    static defaultProps = {
        aspect: "cover"
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="grid-layout">
                <div className="grid-layout-container"> 
                    <div className="grid"> 
                    {
                        this.props.items.map(item => 
                            <GridItem details={item.details} name={item.name} img={item.img} url={item.url} aspect={this.props.aspect}/>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default GridLayout;