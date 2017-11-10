import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SortAndFilter from '../components/SortAndFilter';

const endpoint = (page, filter, sort) =>
    `http://gamingdb.info/api/platform?page=${page}&q={"filters":${filter},"order_by":${sort}}`

const rangeFilters = {
    "Rating": {
        "low": "0",
        "high": "100",
        "min": "0",
        "max": "100"
    },
    "Release Date": {
        "low": "1973",
        "high": "2017",
        "min": "1973",
        "max": "2017"
    }
};

const attrMap = {
    "Name": "name",
    "Release Date": "release_date",
    "Rating": "average_rating"
};
                
class PlatformsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platforms:[],
            loading: true,
            pageLimit: 0,
            selectedSort: "Sort By",
            filter: [],
            sort: [],
        };
    };

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container main-page">
                        <Title title="Platforms"/>
                        <SortAndFilter 
                            sortOptions={Object.keys(attrMap)} current={this.state.selectedSort} 
                            changeSort={this.changeSort} rangeFilters={rangeFilters} 
                            changeRangeFilter={this.changeRangeFilter}/>
                        <GridLayout items={this.state.platforms} aspect="contain"/>
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
        this.props.history.push('/platforms/page/' + (parseInt(this.props.match.params.page, 10) + 1));
    }

    decPage = () => {
        this.props.history.push('/platforms/page/' + (parseInt(this.props.match.params.page, 10) - 1));
    }

    changePage = () => {
        this.setState({
            platforms: [],
            loading: true
        }, () => { this.fetchData() });
    }

    fetchData() {
        fetch(
            endpoint(this.props.match.params.page, 
                JSON.stringify(this.state.filter), 
                JSON.stringify(this.state.sort)),
            { method: 'GET' })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Failed to retrieve response object for game.');
        })
        .then(response => {
            this.setState({
                pageLimit: response.total_pages
            });
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = this._buildDetails(obj);
                let item = {
                    name: obj.name,
                    img: obj.thumb_url,
                    url: "/platforms/" + obj.platform_id,
                    details: details
                }
                var platforms = this.state.platforms.slice();
                platforms.push(item);
                this.setState({ platforms: platforms });
            }
            this.setState({
                loading: false
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    changeSort = (attr, reverse) => {
        this.setState({
            sort: [{
                "field": attrMap[attr],
                "direction": reverse ? "desc" : "asc"
            }],
            selectedSort: attr + (reverse ? ' (Reverse)' : ''),
            platforms: [],
            loading: true
        }, () => {
            this.props.history.push('/platforms/page/1');
        });
    }

    changeRangeFilter = (attr, low, high) => {
        rangeFilters[attr].low = low;
        rangeFilters[attr].high = high;
        this.setState({
            filter: this._buildFilter(),
            platforms: [],
            loading: true
        }, () => { 
            this.props.history.push('/platforms/page/1'); 
        });
    }

    _buildFilter() {
        let result = [];
        Object.keys(rangeFilters).forEach(function(key) {
            let filter = rangeFilters[key];
            result.push({
                "name": attrMap[key],
                "op": "ge",
                "val": filter.low
            });
            result.push({
                "name": attrMap[key],
                "op": "le",
                "val": filter.high
            })
        });
        return result;
    }

    _buildDetails(obj) {
        let details = []
        if(obj.release_date) 
            details.push({ title: "Released:", content: obj.release_date});
        if(obj.average_rating)
            details.push({title: "Average Rating:", content: obj.average_rating + "/100"});
        if(obj.games)
            if(obj.games.length > 0)
                details.push({title: "Game:", content: obj.games[0].name});

        return details;
    }
}

export default PlatformsPage;
