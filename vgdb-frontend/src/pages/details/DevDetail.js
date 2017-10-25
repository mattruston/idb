import React, {Component} from 'react';
import DetailsPage from './DetailsPage';

class DevDetail extends Component {
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
        fetch("http://gamingdb.info/api/developer/" + this.props.match.params.id,{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            let platforms = this._stringFromArray(response.platforms);
            this.setState({
                title: response.name ? response.name : "",
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Rating", content: response.rating ? response.rating : "" },
                ],
                img: response.image_url,
                sidebar: [
                    { title: "Release Date", content: response.release_date ? response.release_date : ""} ,
                    { title: "Platforms", content: platforms },
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

export default DevDetail;