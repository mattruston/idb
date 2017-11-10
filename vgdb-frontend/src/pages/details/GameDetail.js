import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/Loader';

class GameDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            mainbar: [],
            img: "",
            sidebar: [],
            relatedGames: [],
            loading: true
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }
    
    onRouteChanged() {
        this.setState({ 
            loading: true,
            relatedGames: []
        }, () => {
            this._fetchData();
        });
    }

    render() {
        return(
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <DetailsPage name={this.state.name} description={this.state.description}
                            mainbar={this.state.mainbar} img={this.state.img} sidebar={this.state.sidebar} 
                            linkbar={this.state.linkbar} games={this.state.relatedGames}
                            gamesTitle={"Related Games:"}/>
                }
            </div>
        );
    }

    _fetchData() {
        fetch("http://gamingdb.info/api/game/" + this.props.match.params.id,{
            method: 'GET'
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Failed to retrieve response object for game.');
        })
        .then(response => {
            Promise.all(
                this._fetchRelatedGames(response.related_game_ids)
            ).then(results => {
                let relatedGamesArray = [];
                for (let i = 0; i < results.length; i++) {
                    let response = results[i];
                    if (response != null) {
                        let item = {
                            name: response.name,
                            img: response.thumb_url,
                            url: "/games/" + response.game_id,
                            details: this._buildDetails(response)
                        };
                        relatedGamesArray.push(item);
                    }
                }
                this.setState({
                    relatedGames: relatedGamesArray
                });
            });
            let genres = this._stringFromArray(response.genres);
            let devs = this._topModels(response.developers, "/developers/", "developer_id");
            let platforms = this._topModels(response.platforms, "/platforms/", "platform_id");
            let characters = this._topModels(response.characters, "/characters/", "character_id");
            this.setState({
                name: response.name ? response.name : "",
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Rating", content: response.rating ? response.rating + "/100" : "" },
                    { title: "Genres", content: genres }

                ],
                img: response.image_url,
                linkbar: [
                    { title: "Top Platforms", links: platforms },
                    { title: "Top Developers", links: devs },
                    { title: "Top Characters", links: characters }
                ]
            });
            this.setState({
                loading: false
            })
        }).catch(error => {
            console.log(error);
        });
    };

    _fetchRelatedGames(idArray) {
        let promiseArray = [];
        if(idArray !== null) {
            for (var i = 0; i < idArray.length; i++) {
                promiseArray.push(
                    this._fetchGame(idArray[i])
                );
            }
        }
        return promiseArray;
    }

    _fetchGame(id) {
        return fetch("http://gamingdb.info/api/game/" + id,{
            method: 'GET'
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Failed to retrieve response object for game.');
        }).catch(error => {
            console.log(error);
            return null;
        });
    }

    _stringFromArray(a) {
        if(!a) {
            return "";
        }
        let s = "";
        for( let x of a ) {
            s += x.name;
            s += ", ";
        }
        return s.substring(0, s.length - 2);
    }

    _buildDetails(obj) {
        let details = []
        if(obj.release_date) 
            details.push({ title: "Released:", content:obj.release_date});
        if(obj.rating) 
            details.push({title: "Rating:", content: obj.rating + "/100"});
        if(obj.genres.length > 0)
            details.push({title: "Genre:", content:obj.genres[0].name});

        return details;
    }

    _topModels(array, path, idKey) {
        let result = [];
        array.sort(function(a, b) {
           return b.average_rating - a.average_rating;
        });
        for (var i = 0; i < array.length; i++) {
            let obj = array[i];
            result.push({
                text: obj.name,
                link: path + obj[idKey]
            });
        if (i === 5)
            break;
        }   
        return result; 
    }

}

export default GameDetail;