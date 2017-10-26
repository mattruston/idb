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
                            mainbar={this.state.mainbar} img={this.state.img} sidebar={this.state.sidebar}/>
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
            let devs = this._stringFromArray(response.developers);
            let platforms = this._stringFromArray(response.platforms)
            this.setState({
                title: response.title ? response.title : "",
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Rating", content: response.rating ? response.rating.toFixed(1) + "/100" : "" },
                    { title: "Genres", content: genres }

                ],
                img: response.image_url,
                sidebar: [
                    { title: "Release Date", content: response.release_date ? response.release_date : ""} ,
                    { title: "Platforms", content: platforms },
                    { title: "Developers", content: devs }
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
}

export default GameDetail;