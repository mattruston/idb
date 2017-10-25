import React, {Component} from 'react';
import DetailsPage from './DetailsPage';

class GameDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            mainbar: [],
            img: "",
            sidebar: [],
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        return(
            <DetailsPage title={this.state.title} description={this.state.description}
                        mainbar={this.state.mainbar} img={this.state.img} sidebar={this.state.sidebar}/>
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
                    { title: "Rating", content: response.rating ? response.rating : "" },
                    { title: "Genres", content: genres }

                ],
                img: response.image_url,
                sidebar: [
                    { title: "Release Date", content: response.release_date ? response.release_date : ""} ,
                    { title: "Platforms", content: platforms },
                    { title: "Developers", content: devs }
                ]
            });
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