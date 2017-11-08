import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SortDropdown from '../components/SortDropdown';
import Filters from '../components/Filters';

let endpoint = (page, filter, sort) =>
                    `http://gamingdb.info/api/game?page=${page}&q={"filters":${filter},"order_by":${sort}}`

let rangeFilters = {
    "Rating": {
        "low": "0",
        "high": "100"
    },
    "Release Date": {
        "low": "1977",
        "high": "2017"
    }
};

let attrMap = {
    "Title": "title",
    "Rating": "rating",
    "Release Date": "release_date",
    "Popularity": "game_id"
};

class GamesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games:[],
            filter: [],
            sort: [],
            selectedSort: "Sort By",
            loading: true,
            pageLimit: 0
        };
    };

    componentDidMount() {
        this.fetchData();
    };

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container main-page">
                        <Title title="Games"/>
                        <SortDropdown sortOptions={this._buildSortOptions(Object.keys(attrMap))} current={this.state.selectedSort} changeSort={this.changeSort}/>
                        <Filters rangeFilters={rangeFilters} changeRangeFilter={this.changeRangeFilter}/>
                        <GridLayout items={this.state.games}/>
			            <Pagination page={this.props.match.params.page} pagelimit={this.state.pageLimit} decPage={this.decPage} incPage={this.incPage}/>
                    </div>
                }
            </div>
        )
    }

    fetchData() {
        console.log(endpoint(this.props.match.params.page, 
                        JSON.stringify(this.state.filter), 
                            JSON.stringify(this.state.sort)));
        fetch(endpoint(this.props.match.params.page, 
                        JSON.stringify(this.state.filter), 
                            JSON.stringify(this.state.sort)),{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            this.setState({
                pageLimit: response.total_pages
            });
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = this._buildDetails(obj);
                let item = {
                    title: obj.title,
                    img: obj.thumb_url,
                    url: "/games/" + obj.game_id,
                    details: details
                }
                var gamesArray = this.state.games.slice();
                gamesArray.push(item);
                this.setState({ games: gamesArray });
            }
            this.setState({
                loading: false
            });
        });
    };
    
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }
    
    onRouteChanged() {
        this.changePage();
    }
    
    incPage = () => {
        this.props.history.push('/games/page/' + (parseInt(this.props.match.params.page, 10) + 1));
        this.changePage();
    }

    decPage = () => {
        this.props.history.push('/games/page/' + (parseInt(this.props.match.params.page, 10) - 1));
        this.changePage();
    }

    changePage = () => {
        this.setState({
            games: [],
            loading: true
        }, () => { this.fetchData() });
    };

    changeSort = (attr, reverse) => {
        this.setState({
            sort: [{
                "field": attrMap[attr],
                "direction": reverse ? "desc" : "asc"
            }],
            selectedSort: attr + (reverse ? ' (Reverse)' : ''),
            games: [],
            loading: true
        }, () => { this.fetchData() });
    };

    changeRangeFilter = (attr, low, high) => {
        rangeFilters[attr].low = low;
        rangeFilters[attr].high = high;
        this.setState({
            filter: this._buildFilter(),
            games: [],
            loading: true
        }, () => { this.fetchData() });
    };

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
            details.push({ title: "Released:", content:obj.release_date});
        if(obj.rating) 
            details.push({title: "Rating:", content: obj.rating.toFixed(0) + "/100"});
        if(obj.genres.length > 0)
            details.push({title: "Genre:", content:obj.genres[0].name});

        return details;
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

export default GamesPage;
