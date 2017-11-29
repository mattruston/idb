import React, { Component } from 'react';
import GridLayout from '../components/grid/GridLayout';
import Title from '../components/Title';
import Loader from '../components/loader/Loader';
import Pagination from '../components/Pagination';
import SortAndFilter from '../components/filter/SortAndFilter';
import { request, buildDetails, buildFilter } from '../components/Util'; 

const endpoint = (page, filter, sort) =>
    `http://gamingdb.info/api/developer?page=${page}&q={"filters":${filter},"order_by":${sort}}`

const rangeFilters = {
    "Average Rating": {
        "low": "0",
        "high": "100",
        "min": "0",
        "max": "100"
    }
};

const attrMap = {
    "Name": "name",
    "Average Rating": "average_rating"
};

const detailMap = {
    "location": "Location:",
    "average_rating": "Average Rating:",
    "games": "Top Game:"
}

class DevPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            developers:[],
            loading: true,
            pageLimit: 0,
            selectedSort: "Sort By  🡻🡹",
            filter: [],
            sort: [],
        };
    }

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container main-page">
                        <Title title="Developers"/>
                        <SortAndFilter 
                            sortOptions={Object.keys(attrMap)} current={this.state.selectedSort} 
                            changeSort={this.changeSort} rangeFilters={rangeFilters} 
                            changeRangeFilter={this.changeRangeFilter}/>
                        <GridLayout items={this.state.developers} aspect="contain"/>
                        <Pagination page={this.props.match.params.page} pagelimit={this.state.pageLimit} decPage={this.decPage} incPage={this.incPage}/>
                    </div>
                }
            </div>
        )
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }
    
    onRouteChanged() {
        this.changePage();
    }

    incPage = () => {
        this.props.history.push('/developers/page/' + (parseInt(this.props.match.params.page, 10) + 1));
    }

    decPage = () => {
        this.props.history.push('/developers/page/' + (parseInt(this.props.match.params.page, 10) - 1));
    }

    changePage = () => {
        this.setState({
            developers: [],
            loading: true
        }, () => { this.fetchData() });
    }

    callback = (response) => {
        if (response) {
            let devArray = [];
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = buildDetails(obj, detailMap);
                let item = {
                    name: obj.name,
                    img: obj.thumb_url,
                    url: "/developers/" + obj.developer_id,
                    details: details
                }
                devArray.push(item);
            }
            this.setState({
                developers: devArray,
                loading: false,
                pageLimit: response.total_pages
            });
        } else {
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    fetchData() {
        request(endpoint(this.props.match.params.page, JSON.stringify(this.state.filter), 
            JSON.stringify(this.state.sort)), this.callback);
    };

    changeSort = (attr, reverse) => {
        let newFilter = buildFilter(rangeFilters, attrMap);
        newFilter.push({
            "name": attrMap[attr],
            "op": "is_not_null"
        });
        this.setState({
            sort: [{
                "field": attrMap[attr],
                "direction": reverse ? "desc" : "asc"
            }],
            selectedSort: attr + (reverse ? ' 🡻' : ' 🡹'),
            developers: [],
            loading: true,
            filter: newFilter
        }, () => {
            this.props.history.push('/developers/page/1');
        });
    }

    changeRangeFilter = (attr, low, high) => {
        rangeFilters[attr].low = low;
        rangeFilters[attr].high = high;
        let newFilter = buildFilter(rangeFilters, attrMap);
        if (!this.state.selectedSort.includes("Sort By")) {
            newFilter.push({
                "name": attrMap[this.state.selectedSort.substring(0, this.state.selectedSort.lastIndexOf(" "))],
                "op": "is_not_null"
            })
        }
        this.setState({
            filter: newFilter,
            developers: [],
            loading: true
        }, () => { 
            this.props.history.push('/developers/page/1'); 
        });
    }
}

export default DevPage;
