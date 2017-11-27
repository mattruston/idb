import React, {Component} from 'react';
import {BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from 'recharts';

class GDBBarChart extends Component {
    render() {
        return (
            <BarChart width={this.props.width} height={this.props.height} data={this.props.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                {
                    this.props.keys.map((key, i) => {
                        return <Bar key={key} dataKey={key} fill={this.props.colors[i]} />
                    })
                }
            </BarChart>
        );
    }
}

export default GDBBarChart;