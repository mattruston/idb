import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';
import Pagination from 'react-js-pagination';

const gamesEndpoint = pageNumber =>
                    `http://gamingdb.info/api/game?page=${pageNumber}`
const gameURL = gameID =>
                `/games/${gameID}`

const TOTAL_GAMES = 1000;

const GAMES_PER_PAGE = 8;

class GamesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            details: [
                "rating",
                "release_date",
                "genre"
            ],
            games:[],
            loading: true
        };
    };

    changePage(pageNumber) {
        this.setState({
            page: pageNumber,
            games: [],
            loading: true
        });
        this.fetchGames();
    };

    _buildDetails(obj) {
        let details = []
        if(obj.release_date) 
            details.push({ title: "Released:", content:obj.release_date});
        if(obj.rating) 
            details.push({title: "Rating:", content:obj.rating});
        if(obj.genres.length > 0)
            details.push({title: "Genre:", content:obj.genres[0]});

        return details;
    }

    fetchGames() {
        fetch(gamesEndpoint(this.state.page),{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = this._buildDetails(obj);
                let item = {
                    title: obj.title,
                    img: obj.image_url,
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

    componentDidMount() {
        this.fetchGames();
    };

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container">
                        <Title title="Games"/>
                        <GridLayout items={this.state.games} details={this.state.details}/>
                    </div>
                }
               <Pagination
                    hideDisabled
                    activePage={this.state.page}
                    itemsCountPerPage={GAMES_PER_PAGE}
                    totalItemsCount={TOTAL_GAMES}
                    onChange={(pageNumber) => this.changePage(pageNumber)}
                />
            </div>
        )
    }
}

export default GamesPage;
