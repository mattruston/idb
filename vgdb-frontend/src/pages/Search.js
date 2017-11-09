import React, {Component} from 'react';
import SearchItem from '../components/SearchItem';
import Title from '../components/Title';
import Loader from '../components/Loader';
import './styles/search.css';

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
            loading: false
        }
    }

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container main-page">
                        <div className="search-query">Search Query: <strong>{this.props.match.params.query}</strong></div>
                        <SearchItem obj={ 
                            { name: "FIFA 18", description: "Powered by Frostbite™, EA SPORTS™ 18 blurs the line between the virtual and real worlds, bringing to life the players, teams, and atmospheres that immerse you in the emotion of The World’s Game.", 
                                image_url:"http://res.cloudinary.com/gamingdb/image/upload/games/sdvrxyue8h4vg3ojihfb.jpg"} } query="fifa soccer"/>
                        <SearchItem obj={ 
                            { name: "FIFA 18", description: "Powered by Frostbite™, EA SPORTS™ FIFA 18 blurs the line between the virtual and fifa real worlds, bringing to life fifa the players, teams, and atmospheres that immerse you in the emotion of fifa The World’s Game.", 
                                image_url:"http://res.cloudinary.com/gamingdb/image/upload/games/sdvrxyue8h4vg3ojihfb.jpg"} } query="fifa soccer"/>
                        { this.state.gameResults.map( () => {
                            <SearchItem/>
                        })}
                    </div>
                }
            </div>
        );
    }

}

export default Search;