import React, { Component } from 'react';
import GridLayout from '../components/grid/GridLayout';
import Title from '../components/Title';
import Loader from '../components/loader/Loader';
import Pagination from '../components/Pagination';
import SortAndFilter from '../components/filter/SortAndFilter';
import { request, buildDetails, buildFilter } from '../components/Util';

const endpoint = (page, filter, sort) =>
                    `http://gamingdb.info/api/game?page=${page}&q={"filters":${filter},"order_by":${sort}}`

const rangeFilters = {
    "Rating": {
        "low": "0",
        "high": "100",
        "min": "0",
        "max": "100"
    },
    "Release Date": {
        "low": "1977",
        "high": "2017",
        "min": "1977",
        "max": "2017"
    }
};

const attrMap = {
    "Name": "name",
    "Rating": "rating",
    "Release Date": "release_date",
    "Popularity": "game_id"
};

const detailMap = {
    "release_date": "Released:",
    "rating": "Rating:",
    "genres": "Genre:"
}

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
                        <SortAndFilter 
                            sortOptions={Object.keys(attrMap)} current={this.state.selectedSort} 
                            changeSort={this.changeSort} rangeFilters={rangeFilters} 
                            changeRangeFilter={this.changeRangeFilter}/>
                        <GridLayout items={this.state.games}/>
			            <Pagination page={this.props.match.params.page} pagelimit={this.state.pageLimit} decPage={this.decPage} incPage={this.incPage}/>
                    </div>
                }
            </div>
        )
    }

    callback = (response) => {
        if (response) {
            let gamesArray = [];
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = buildDetails(obj, detailMap);
                let item = {
                    name: obj.name,
                    img: obj.thumb_url,
                    url: "/games/" + obj.game_id,
                    details: details
                }
                gamesArray.push(item);
            }
            this.setState({
                games: gamesArray,
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

    fetchData = () => {
        request(endpoint(this.props.match.params.page, JSON.stringify(this.state.filter), 
            JSON.stringify(this.state.sort)), this.callback);
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
    }

    decPage = () => {
        this.props.history.push('/games/page/' + (parseInt(this.props.match.params.page, 10) - 1));
    }

    changePage = () => {
        console.log("change page...");
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
        }, () => {
            this.props.history.push('/games/page/1');
        });
    };

    changeRangeFilter = (attr, low, high) => {
        rangeFilters[attr].low = low;
        rangeFilters[attr].high = high;
        this.setState({
            filter: buildFilter(rangeFilters, attrMap),
            games: [],
            loading: true
        }, () => { 
            this.props.history.push('/games/page/1'); 
        });
    };
}

export default GamesPage;
