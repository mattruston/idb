import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';

let endpoint = (pageNumber) =>
                    `http://gamingdb.info/api/game?page=${pageNumber}`

let pageLimit = 42;

class GamesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            games:[],
            loading: true
        };
    };

    fetchData() {
        fetch(endpoint(this.state.page),{
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
        this.fetchData();
    };

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container main-page">
                        <Title title="Games"/>
                        <GridLayout items={this.state.games}/>
			            <div>{"Page Number: " + this.state.page + "/" + pageLimit}</div>
                        <button onClick={this.decPage} disabled={this.state.page == 1}>Previous Page</button>
                        <button onClick={this.incPage} disabled={this.state.page == pageLimit}>Next Page</button>
                    </div>
                }
            </div>
        )
    }

    incPage = () => {
        this.changePage(this.state.page + 1);
    }

    decPage = () => {
        this.changePage(this.state.page - 1);
    }

    changePage = (page) => {
        this.setState({
            page: page,
            games: [],
            loading: true
        }, () => { this.fetchData() });
    };

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
}

export default GamesPage;
