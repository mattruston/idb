import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/Loader';

class PlatformDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            mainbar: [],
            img: "",
            sidebar: [],
            loading: true
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        return(
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <DetailsPage name={this.state.name} description={this.state.description}
                        mainbar={this.state.mainbar} img={this.state.img} sidebar={this.state.sidebar}
                        linkbar={this.state.linkbar} games={this.state.games}
                        gamesTitle={"Top Games:"}/>
                }
                </div>
        );
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

    _fetchData() {
        fetch("http://gamingdb.info/api/platform/" + this.props.match.params.id,{
            method: 'GET'
        }).then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Failed to retrieve response object for game.');
        })
        .then(response => {
            let devs = this._topModels(response.developers, "/developers/", "developer_id");
            let characters = this._topModels(response.characters, "/characters/", "character_id");
            let gameItems = this._gameItemsFromArray(response.games);
            let website = response.website ? [{link: response.website, text: response.website, external: true}] : [];
            this.setState({
                name: response.name,
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Average Rating", content: response.average_rating ? response.average_rating + "/100" : "" }
                ],
                img: response.image_url ? response.image_url : "",
                sidebar: [
                    { title: "Release Date", content: response.release_date ? response.release_date : ""}
                ],
                linkbar: [
                    { title: "Top Developers", links: devs },
                    { title: "Top Characters", links: characters },
                    { title: "Website", links: website}
                ],
                games: gameItems
            });
            this.setState({ loading: false });
        }).catch(error => {
            console.log(error);
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

    _gameItemsFromArray(gameArray) {
        let result = [];
        gameArray.sort(function(a, b) {
            return b.rating - a.rating;
        });
        for (var i = 0; i < gameArray.length; i++) {
            let obj = gameArray[i];
            result.push({
                name: obj.name,
                img: obj.thumb_url,
                url: "/games/" + obj.game_id,
                details: this._buildGameDetails(obj)
            });
            if (i === 10)
                break;
        }
        return result;
    }

    _buildGameDetails(obj) {
        let details = []
        if(obj.release_date) 
            details.push({title: "Released:", content:obj.release_date});
        if(obj.rating) 
            details.push({title: "Rating:", content: obj.rating + "/100"});

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

export default PlatformDetail;