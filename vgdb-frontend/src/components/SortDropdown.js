import React, {Component} from 'react';
import './styles/sortandfilter.css';

class SortDropdown extends Component {
    constructor(props) {
		super(props);

        this.state = {
            drop: false
        }
		this.setSortBy = (name, reverse) => {
			return (event) => {
				event.stopPropagation();
                console.log(name + " " + reverse);
				this.props.changeSort(name, reverse);
				return false;
			};
		};
    }
    
    toggleDrop = () => {
        this.setState({ drop: !this.state.drop });
    }

    render() { 
		const dropdownItem = (sortOpt) => {
			const rev  = sortOpt.reverse;
			const name = sortOpt.sort + (rev ? ' (Reverse)' : '');
			return (
				<a onClick={this.setSortBy(sortOpt.sort, rev)}>{name}</a>
			);
		};
        return (
            <div className="sort">
                <div className="dropdown">
                    <button className="dropbtn" onClick={this.toggleDrop}>
                        {this.props.current}
                    </button>
                    {
                        this.state.drop && 
                        <div className='dropdown-list'>
                            {this.props.sortOptions.map( sort => dropdownItem(sort) )}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default SortDropdown;