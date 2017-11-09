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
        this.setState({ loading: true }, () => {
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
        }).then(response => response.json())
        .then(response => {
            console.log(response);
            Promise.all(
                this._fetchRelatedGames(response.related_game_ids)
            ).then(results => {
                let relatedGamesArray = [];
                for (let i = 0; i < results.length; i++) {
                    let response = results[i];
                    let item = {
                        name: response.name,
                        img: response.thumb_url,
                        url: "/games/" + response.game_id,
                        details: this._buildDetails(response)
                    };
                    relatedGamesArray.push(item);
                }
                this.setState({
                    relatedGames: relatedGamesArray
                });
            });
            let genres = this._stringFromArray(response.genres);
            let devs = this._linkbarFromArray(response.developers, "/developers/","developer_id");
            let platforms = this._linkbarFromArray(response.platforms,"/platforms/", "platform_id");
            let characters = this._linkbarFromArray(response.characters, "/characters/", "character_id");

            this.setState({
                name: response.name ? response.name : "",
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Rating", content: response.rating ? response.rating + "/100" : "" },
                    { title: "Genres", content: genres }

                ],
                img: response.image_url,
                linkbar: [
                    { title: "Platforms", links: platforms },
                    { title: "Developers", links: devs },
                    { title: "Characters", links: characters }
                ]
            });
            this.setState({
                loading: false
            })
        });
    };

    _fetchRelatedGames(idArray) {
        let promiseArray = [];
        console.log(idArray);
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
        }).then(response => response.json());
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

    _linkbarFromArray(array, path, idKey) {
        let result = [];
        for (var i = 0; i < array.length; i++) {
            result.push({
                link: path + array[i][idKey],
                text: array[i]["name"]
            });
        }
        return result;
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

}

export default GameDetail;