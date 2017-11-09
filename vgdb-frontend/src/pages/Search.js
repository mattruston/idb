import React, {Component} from 'react';
import SearchItem from '../components/SearchItem';
import Title from '../components/Title';
import Loader from '../components/Loader';
import './styles/search.css';

const endpoint = (model, filter) => {
    return `http://gamingdb.info/api/${model}?q={"filters":[{"or":${filter}}]}`;
}

const stringFilter = (attr, query) => {
    return {
        "name":attr,
        "op":"ilike",
        "val":"%" + query + "%"
    }
}

const numFilter = (attr, query) => {
    return {
        "name": attr,
        "op":"eq",
        "val": query
    }
}

const genreFilter = (query) => {
    return {
        "name":"genres",
        "op":"any",
        "val":{
            "name":"name",
            "op":"ilike",
            "val":"%" + query + "%"
        }
    }
}

const searchAttrs = {
    "game": {
        "strings": [
            "description",
            "title"
        ],
        "nums": [
            "rating"
        ],
        "genres": [
            "genres"
        ]
    },
    "developer": {
        "strings": [
            "description",
            "name",
            "location",
            "website"
        ],
        "nums": [
            "average_rating"
        ]
    },
    "platform": {
        "strings": [
            "description",
            "name",
            "website"
        ],
        "nums": [
            "average_rating"
        ]
    },
    "character": {
        "strings": [
            "gender",
            "name",
            "species"
        ]
    }
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                pageLimit: 0,
                results: [],
                loading: true
            },
            developer: {
                pageLimit: 0,
                results: [],
                loading: true
            },
            platform: {
                pageLimit: 0,
                results: [],
                loading: true
            },
            character: {
                pageLimit: 0,
                results: [],
                loading: true
            }
        }
    }

    componentDidMount() {
        this._buildFilters(this.props.match.params.query.split(" "));
    };

    componentWillReceiveProps(nextProps){
		this._buildFilters(nextProps.match.params.query.split(" "));
	};

    fetchData(filter, modelType) {
        fetch(endpoint(modelType, JSON.stringify(filter)),{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            let resultObj = {};
            resultObj[modelType] = {
                pageLimit: response.total_pages,
                results: response.objects,
                loading: false
            };
            this.setState( resultObj );
        });

    }

    render() {
        return (
            <div>
                {this.state.game.loading && <Loader/>}
                {!this.state.game.loading && 
                    <div className="container main-page">
                        <div className="search-query">Search Query: <strong>{this.props.match.params.query}</strong></div>
                        { this.state.game.results.map( (obj) => {
                            return <SearchItem obj={obj} query={this.props.match.params.query} link={"/games/" + obj.game_id}/>
                        })}
                    </div>
                }
            </div>
        );
    }

    _buildFilters(query) {
        let filters = {
            "game": [],
            "developer": [],
            "platform": [],
            "character": []
        };
        for (var i = 0; i < query.length; i++) {
            let currString = query[i];
            //console.log(currString);
            Object.keys(searchAttrs).forEach(function(model) {
                Object.keys(searchAttrs[model]).forEach(function(type) {
                    let currFilterArray = filters[model];
                    let attrArray = searchAttrs[model][type];
                    for (var j = 0; j < attrArray.length; j++) {
                        if (type == "strings" && isNaN(currString)) {
                            currFilterArray.push(stringFilter(attrArray[j], currString));
                        } else if (type == "nums" && !isNaN(currString)) {
                            currFilterArray.push(numFilter(attrArray[j], currString));
                        } else if (type == "genres" && isNaN(currString)) {
                            currFilterArray.push(genreFilter(currString));
                        }
                    }
                })
            });
        }
        //console.log(filters);

        let models = Object.keys(filters);
        for (var i = 0; i < models.length; i++) {
            this.fetchData(filters[models[i]], models[i]);
        };
    }

}

export default Search;