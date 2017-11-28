import React, { Component } from 'react';
import SortDropdown from './SortDropdown';
import Filters from './Filters';
import '../styles/sortandfilter.css';

class SortAndFilter extends Component {
    render() {
        return (
            <div className="sortandfilter">
                <SortDropdown sortOptions={this._buildSortOptions(this.props.sortOptions)} current={this.props.current} 
                changeSort={this.props.changeSort}/>
                <Filters rangeFilters={this.props.rangeFilters} changeRangeFilter={this.props.changeRangeFilter}/>
            </div>
        );
    } 

    _buildSortOptions(options) {
        let result = [];
        for (var i = 0; i < options.length; i++) {
            result.push({
                sort: options[i],
                reverse: false
            });
            result.push({
                sort: options[i],
                reverse: true
            });
        }
        return result;
    }
}

export default SortAndFilter;