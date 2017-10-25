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

    fetchGames() {
        fetch(gamesEndpoint(this.state.page),{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            for (var i = 0; i < response.objects.length; i++) {
                var gameObj = response.objects[i];
                gameObj.url = gameURL(gameObj.game_id);
                var gamesArray = this.state.games.slice();
                gamesArray.push(gameObj);
                this.setState({ games: gamesArray });
            }
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