import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/Loader';

class GameDetail extends Component {
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
        fetch("http://gamingdb.info/api/game/" + this.props.match.params.id,{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            let genres = this._stringFromArray(response.genres);
            let devs = this._linkbarFromArray(response.developers, "/developers/","developer_id", "name");
            let platforms = this._linkbarFromArray(response.platforms,"/platforms/", "platform_id", "name");
            let characters = this._linkbarFromArray(response.characters, "/characters/", "character_id", "name")
            this.setState({
                title: response.title ? response.title : "",
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Rating", content: response.rating ? response.rating.toFixed(1) + "/100" : "" },
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

export default GameDetail;