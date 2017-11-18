import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/Loader';
import { request, buildDetails, topModels } from '../../components/Util';

const detailMap = {
    "release_date": "Released:",
    "rating": "Rating:",
    "genres": "Genre:"
}

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
        this.fetchData();
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
            this.fetchData();
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

    fetchData() {
        request("http://gamingdb.info/api/game/" + this.props.match.params.id)
        .then(response => {
            if (response) {
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
                                details: buildDetails(response, detailMap)
                            };
                            relatedGamesArray.push(item);
                        }
                    }
                    this.setState({
                        relatedGames: relatedGamesArray
                    });
                });
                let genres = this._getGenreString(response.genres);
                let devs = topModels(response.developers, "/developers/", "developer_id");
                let platforms = topModels(response.platforms, "/platforms/", "platform_id");
                let characters = topModels(response.characters, "/characters/", "character_id");
                this.setState({
                    name: response.name ? response.name : "",
                    description: response.description ? response.description : "",
                    mainbar: [
                        { title: "Release Date", content: response.release_date ? response.release_date : ""},
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
            } else {
                this.setState({
                    loading: false,
                    error: true
                });
            }
        });
    };

    _fetchRelatedGames(idArray) {
        let promiseArray = [];
        if(idArray !== null) {
            for (var i = 0; i < idArray.length; i++) {
                promiseArray.push(
                    request("http://gamingdb.info/api/game/" + idArray[i])
                );
            }
        }
        return promiseArray;
    }

    _getGenreString(a) {
        if(!a) {
            return "";
        }
        let s = [];
        for( let x of a ) {
            s.push(x.name);
        }
        return s.join(", ");
    }
}

export default GameDetail;