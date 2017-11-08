import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/Loader';

class DevDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
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
                    <DetailsPage title={this.state.title} description={this.state.description}
                            mainbar={this.state.mainbar} img={this.state.img} sidebar={this.state.sidebar}
                            linkbar={this.state.linkbar}/>
                }
            </div>
        );
    }

    _fetchData() {
        fetch("http://gamingdb.info/api/developer/" + this.props.match.params.id,{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            let platforms = this._linkbarFromArray(response.platforms, "/platforms/", "platform_id", "name");
            let games = this._linkbarFromArray(response.games, "/games/", "game_id", "title")
            this.setState({
                title: response.name ? response.name : "",
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Rating", content: response.average_rating ? response.average_rating : "" },
                ],
                img: response.image_url,
                linkbar: [
                    { title: "Platforms", links: platforms },
                    { title: "Games", links: games }
                ]

            });
            this.setState({ loading: false })
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

    _linkbarFromArray(array, path, idKey, titleKey) {
        let result = [];
        for (var i = 0; i < array.length; i++) {
            result.push({
                link: path + array[i][idKey],
                text: array[i][titleKey]
            })
            if (i === 2)
                break;
        }
        return result;
    }
}

export default DevDetail;