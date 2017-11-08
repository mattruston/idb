import React, {Component} from 'react';
import FilterInput from './FilterInput';

class Filters extends Component {
    render() { 
        return (
        <div className="pagination">
               {
                   Object.keys(this.props.rangeFilters).map(filterName =>
                        <FilterInput attribute={filterName} min={this.props.rangeFilters[filterName].low} 
                            max={this.props.rangeFilters[filterName].high} changeFilter={this.props.changeRangeFilter}
                            key={filterName}/>
                   )
               }
        </div>
        );
    }
}

export default Filters;