import React, {Component} from 'react';
import DetailsPage from './DetailsPage';
import Loader from '../../components/Loader';

class CharDetail extends Component {
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
        fetch("http://gamingdb.info/api/character/" + this.props.match.params.id,{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            console.log(response);
            let games = this._stringFromArray(response.games);
            this.setState({
                title: response.name ? response.name : "",
                description: response.description ? response.description : "",
                mainbar: [
                    { title: "Gender", content: response.gender ? response.gender : "" },
                    { title: "Race", content: response.race ? response.race: "" }
                ],
                img: response.image_url ? response.image_url : "",
                sidebar: [
                    { title: "Appears in", content: games},
                ]
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
            s += x.title;
            s += ", ";
        }
        return s.substring(0, s.length - 2);
    }
}

export default CharDetail;