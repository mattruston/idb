import React, {Component} from 'react';

class FilterInput extends Component {
    constructor(props) {
		super(props);
        this.MAX = parseInt(this.props.max, 10);
        this.MIN = parseInt(this.props.min, 10);
        this.state = {
            min: this.props.low,
            max: this.props.high
        }
	}

	onMinChange = (evt) => {
		this.setState({
			min: evt.target.value,
		});
	};

	onMaxChange = (evt) => {
		this.setState({
			max: evt.target.value,
		});
	};

	apply = () => {
		this.props.changeFilter(
            this.props.attribute,
			this.state.min,
			this.state.max
		);
	};

    render() { 
        return (
            <div className="filter-item">
                <div className="filter-title">{this.props.attribute}</div>
                <select className="filter-select" value={this.state.min} onChange={this.onMinChange}>
                    { Array(this.MAX - this.MIN).fill().map( (_, i) => {
                        return <option>{(i + 1) + this.MIN}</option> 
                    })}
                </select>
                <select className="filter-select" value={this.state.max} onChange={this.onMaxChange}>
                    { Array(this.MAX - this.MIN).fill().map( (_, i) => {
                        return <option>{(i + 1) + this.MIN}</option> 
                    })}
                </select>
                <button className="filterbtn" onClick={this.apply} disabled={parseInt(this.state.max, 10) < parseInt(this.state.min, 10)}>Apply</button>
            </div>
        );
    }
}

export default FilterInput;