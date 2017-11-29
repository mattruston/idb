import React, {Component} from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from 'recharts';

class GDBLineChart extends Component {
    render() {
        return (
            <LineChart width={this.props.width} height={this.props.height} data={this.props.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    this.props.keys.map((key, i) => {
                        return <Line type="monotone" key={key} dataKey={key} stroke={this.props.colors[i]} />
                    })
                }
            </LineChart>
        );
    }
}

export default GDBLineChart;