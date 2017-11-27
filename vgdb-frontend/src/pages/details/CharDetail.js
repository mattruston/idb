import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/Loader';
import { request, topModels, gameItemsFromArray } from '../../components/Util';

const gameDetailMap = {
    "release_date": "Released:",
    "rating": "Rating:"
}

class CharDetail extends Component {
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
                            linkbar={this.state.linkbar}  games={this.state.games} 
                            gamesTitle={"Appears In:"}/>
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
        request("http://gamingdb.info/api/character/" + this.props.match.params.id, (response) => {
            if (response) {
                let gameItems = gameItemsFromArray(response.games, gameDetailMap);
                let platforms = topModels(response.platforms, "/platforms/", "platform_id");
                this.setState({
                    name: response.name ? response.name : "",
                    description: response.description ? response.description : "",
                    mainbar: [
                        { title: "Average Rating", content: response.average_rating ? response.average_rating + "/100" : "" }
                    ],
                    sidebar: [
                        { title: "Gender", content: response.gender ? response.gender : "" }
                    ],
                    img: response.image_url ? response.image_url : "",
                    linkbar: [
                        { title: "Top Platforms", links: platforms },
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

export default CharDetail;