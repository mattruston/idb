import React, {Component} from 'react';

class SortDropdown extends Component {
    constructor(props) {
		super(props);

		this.setSortBy = (name, reverse) => {
			return (event) => {
				event.stopPropagation();
                console.log(name + " " + reverse);
				this.props.changeSort(name, reverse);
				return false;
			};
		};
	}

    render() { 
		const dropdownItem = (sortOpt) => {
			const rev  = sortOpt.reverse;
			const name = sortOpt.sort + (rev ? ' (Reverse)' : '');
			return (
				<li key={name}>
					<a onClick={this.setSortBy(sortOpt.sort, rev)}>{name}</a>
				</li>
			);
		};
        return (
            <div className="pagination">
                <div className='dropdown'>
                    <button className='pagination-button dropdown-toggle' type='button' 
                    data-toggle='dropdown' aria-haspopup='true' 
                    aria-expanded='true'>
                        {this.props.current}
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='sortByDropdown'>
                            {this.props.sortOptions.map( sort => dropdownItem(sort) )}
                    </ul>
                </div>
        </div>
        );
    }
}

export default SortDropdown;