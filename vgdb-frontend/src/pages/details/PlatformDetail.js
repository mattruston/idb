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

    _fetchData() {
        fetch("http://gamingdb.info/api/platform/" + this.props.match.params.id,{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            let devs = this._linkbarFromArray(response.developers, "/developers/", "developer_id");
            let characters = this._linkbarFromArray(response.characters, "/characters/", "character_id");
            let gameItems = this._gameItemsFromArray(response.games);
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
                    { title: "Developers", links: devs },
                    { title: "Characters", links: characters },
                    { title: "Website", links: [{link: response.website, text: response.website, external: true}]}
                ],
                games: gameItems
            });
            this.setState({ loading: false });
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

    _gameItemsFromArray(gameArray) {
        let result = [];
        gameArray.sort(function(a, b) {
            let valB = b.rating ? b.rating : 0;
            let valA = a.rating ? a.rating : 0;
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
            if (i == 10)
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
}

export default PlatformDetail;