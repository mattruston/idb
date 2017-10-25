import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';

const gamesEndpoint = pageNumber =>
                    `http://gamingdb.info/api/game?page=${pageNumber}`
const gameURL = gameID =>
                `/games/${gameID}`

class GamesPage extends Component {
    constructor(props) {
        super(props);
        this.page = 1;
        this.state = {
            testitems: [
                {title: "test-item-1", details: ["test", "test", "test"], url:"/games/13"},
                {title: "test-item-2", details: ["test", "test", "test"], url:"/games/124"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/games/125"},
                {title: "test-item-3", details: ["test", "test", "test"], url:"/games/126"}
            ],
            details: [
                "rating",
                "release_date",
                "genre"
            ],
            games:[]
        };
    }

    componentDidMount() {
        fetch(gamesEndpoint(this.page),{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            for (var i = 0; i < response.objects.length; i++) {
                var gameObj = response.objects[i];
                gameObj.url = gameURL(gameObj.game_id);
                var gamesArray = this.state.games.slice();
                gamesArray.push(gameObj);
                this.setState({ games: gamesArray })
            }
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Title title="Games"/>
                    <GridLayout items={this.state.games} details={this.state.details}/>
                </div>
            </div>
        )
    }
}

export default GamesPage;