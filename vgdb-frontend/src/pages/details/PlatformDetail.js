import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/loader/Loader';
import { request, topModels, gameItemsFromArray, reformatDate } from '../../components/Util';

const gameDetailMap = {
    "release_date": "Released:",
    "rating": "Rating:"
}

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
        this.fetchData();
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
            this.fetchData();
        });
    }

    fetchData() {
        request("http://gamingdb.info/api/platform/" + this.props.match.params.id, (response) => {
            if (response) {
                let devs = topModels(response.developers, "/developers/", "developer_id");
                let characters = topModels(response.characters, "/characters/", "character_id");
                let gameItems = gameItemsFromArray(response.games, gameDetailMap);
                let website = response.website ? [{link: response.website, text: response.website, external: true}] : [];
                this.setState({
                    name: response.name,
                    description: response.description ? response.description : "",
                    mainbar: [
                        { title: "Average Rating", content: response.average_rating ? response.average_rating + "/100" : "" }
                    ],
                    img: response.image_url ? response.image_url : "",
                    sidebar: [
                        { title: "Release Date", content: response.release_date ? reformatDate(response.release_date) : ""}
                    ],
                    linkbar: [
                        { title: "Top Developers", links: devs },
                        { title: "Top Characters", links: characters },
                        { title: "Website", links: website}
                    ],
                    games: gameItems
                });
                this.setState({ loading: false });
            } else {
                this.setState({
                    loading: false,
                    error: true
                });
            }
        });
    }
}

export default PlatformDetail;