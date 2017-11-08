import React, {Component} from 'react';

class FilterInput extends Component {
    constructor(props) {
		super(props);

        this.state = {
            min: this.props.min,
            max: this.props.max,
            minValid: true,
			maxValid: true
        }
	}

    isValidNum = (str) => (
		str.length > 0 && !isNaN(str)
	);

	onMinChange = (evt) => {
		this.setState({
			min: evt.target.value,
			minValid: this.isValidNum(evt.target.value)
		});
	};

	onMaxChange = (evt) => {
		this.setState({
			max: evt.target.value,
			maxValid: this.isValidNum(evt.target.value)
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
            <div className="pagination">
                <div className='dropdown'>
                    <button className='pagination-button dropdown-toggle' type='button' 
                    data-toggle='dropdown' aria-haspopup='true' 
                    aria-expanded='true'> {this.props.attribute}</button>
                    
                    <label>From:</label>
                    <input
                        type='text'
                        onChange={this.onMinChange}
                        value={this.state.min}
                        placeholder={this.state.lowest}
                    />
                    <label>To:</label>
                    <input
                        type='text'
                        onChange={this.onMaxChange}
                        value={this.state.max}
                        placeholder={this.state.highest}
                    />
                    <button
                        className='pagination-button'
                        onClick={this.apply}
                        disabled={!(this.state.minValid && this.state.maxValid)}
                    >
                        Apply
                    </button>
                </div>
            </div>
        );
    }
}

export default FilterInput;