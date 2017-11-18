import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FilterInput from './FilterInput';

class Filters extends Component {

    constructor(props) {
		super(props);

        this.state = {
            drop: false
        }
    }

     componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }

    handleClick = e => {
        if(!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.setState({drop: false});
        }
    }

    toggleDrop = () => {
        this.setState({ drop: !this.state.drop });
    }

    render() { 
        return (
        <div className="filter">
            <div className="dropdown">
                <button className="dropbtn" onClick={this.toggleDrop}>Filter</button>
                {
                    this.state.drop &&
                    <div className="dropdown-list filter-menu">
                        {
                            Object.keys(this.props.rangeFilters).map(filterName =>
                                <FilterInput attribute={filterName} low={this.props.rangeFilters[filterName].low}
                                    high={this.props.rangeFilters[filterName].high} 
                                    min={this.props.rangeFilters[filterName].min}
                                    max={this.props.rangeFilters[filterName].max}
                                    changeFilter={this.props.changeRangeFilter}
                                    key={filterName}/>
                            )
                        }
                    </div>
                }
            </div>
        </div>
        );
    }
}

export default Filters;