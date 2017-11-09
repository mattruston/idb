import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';
import SortAndFilter from '../components/SortAndFilter';

const endpoint = (page, filter, sort) =>
    `http://gamingdb.info/api/character?page=${page}&q={"filters":${filter},"order_by":${sort}}`

const rangeFilters = { };

const attrMap = {
    "Name": "name",
    "Popularity": "character_id"
};

class CharactersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters:[],
            loading: true,
            pageLimit: 0,
            selectedSort: "Sort By",
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
                        <Title title="Characters"/>
                        <SortAndFilter 
                            sortOptions={Object.keys(attrMap)} current={this.state.selectedSort} 
                            changeSort={this.changeSort} rangeFilters={rangeFilters} 
                            changeRangeFilter={this.changeRangeFilter}/>
                        <GridLayout items={this.state.characters}/>
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
        this.props.history.push('/characters/page/' + (parseInt(this.props.match.params.page, 10) + 1));
    }

    decPage = () => {
        this.props.history.push('/characters/page/' + (parseInt(this.props.match.params.page, 10) - 1));
    }

    changePage = () => {
        this.setState({
            characters: [],
            loading: true
        }, () => { this.fetchData() });
    }

    fetchData() {
        fetch(
            endpoint(this.props.match.params.page, 
                JSON.stringify(this.state.filter), 
                JSON.stringify(this.state.sort)),
            { method: 'GET' })
        .then(response => response.json())
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
                    url: "/characters/" + obj.character_id,
                    details: details
                }
                var chars = this.state.characters.slice();
                chars.push(item);
                this.setState({ characters: chars });
            }
            this.setState({
                loading: false
            });
        });
    }

    changeSort = (attr, reverse) => {
        this.setState({
            sort: [{
                "field": attrMap[attr],
                "direction": reverse ? "desc" : "asc"
            }],
            selectedSort: attr + (reverse ? ' (Reverse)' : ''),
            characters: [],
            loading: true
        }, () => {
            this.props.history.push('/characters/page/1');
        });
    }

    changeRangeFilter = (attr, low, high) => {
        rangeFilters[attr].low = low;
        rangeFilters[attr].high = high;
        this.setState({
            filter: this._buildFilter(),
            characters: [],
            loading: true
        }, () => { 
            this.props.history.push('/characters/page/1'); 
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
        if(obj.gender) 
            details.push({ title: "Gender:", content: obj.gender});
        if(obj.species)
            details.push({title: "Species:", content: obj.species});
        if(obj.games)
            if(obj.games.length > 0)
                details.push({title: "Game:", content: obj.games[0].name});

        return details;
    }
}

export default CharactersPage;
