import React, {Component} from 'react';
import SearchItem from '../components/SearchItem';

const endpoint = (query, type) => {
    return `http://gamingdb.info/api/${type}?q={"filters":[{"or":[{"name":"name","op":"ilike","val":"${query}"},{"name":"description","op":"ilike","val":"${query}"},{"name":"genres","op":"any","val":{"name":"name","op":"ilike","val":"${query}"}}]}]}`;
}

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameResults: [],
            devResults: [],
            platformResults: [],
            characterResults: [],
            loading: true
        }
    }

    render() {
        return (
            <div>
                { this.state.gameResults.map( () => {
                    <SearchItem/>
                })}
            </div>
        );
    }

}

export default Search;