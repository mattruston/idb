import React, { Component } from 'react';
import SortDropdown from '../components/SortDropdown';
import Filters from '../components/Filters';
import './styles/sortandfilter.css';

class SortAndFilter extends Component {
    render() {
        return (
            <div className="sortandfilter">
                <SortDropdown sortOptions={this.props.sortOptions} current={this.props.current} 
                changeSort={this.props.changeSort}/>
                <Filters rangeFilters={this.props.rangeFilters} changeRangeFilter={this.props.changeRangeFilter}/>
            </div>
        );
    } 
}

export default SortAndFilter;