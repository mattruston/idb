import React, {Component} from 'react';
import {Pie, PieChart, Cell} from 'recharts';

class GDBPieChart extends Component {
    render() {
        return (
            <PieChart width={this.props.width} height={this.props.height}>
                <Pie data={this.props.data} dataKey="value" cx={this.props.width/2} cy={this.props.height/2} outerRadius={80} label={(obj)=> obj.name}>
                    { 
                        this.props.data.map((entry, index) => 
                            <Cell key={entry} fill={this.props.colors[index % this.props.colors.length]}/>
                        ) 
                    }
                </Pie>
            </PieChart>
        );
    }
}

export default GDBPieChart;