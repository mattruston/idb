import React, {Component} from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

class GDBScatterPlot extends Component {
    render() {
        return (
            <ScatterChart width={this.props.width} height={this.props.height} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                <XAxis dataKey={this.props.keys[0]} type="number" name={this.props.keys[0]} unit='ft'/>
                <YAxis dataKey={this.props.keys[1]} type="number" name={this.props.keys[1]} unit='lbs'/>
                <CartesianGrid />
                <Scatter name='Scatter Plot' data={this.props.data} fill={this.props.colors[1]}/>
                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            </ScatterChart>
        );
    }
}

export default GDBScatterPlot;