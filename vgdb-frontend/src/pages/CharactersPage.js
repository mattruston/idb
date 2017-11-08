import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

let endpoint = pageNumber =>
                    `http://gamingdb.info/api/character?page=${pageNumber}`

class CharactersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters:[],
            loading: true,
            pageLimit: 0
        };
    };

    fetchData() {
        fetch(endpoint(this.props.match.params.page),{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            this.setState({
                pageLimit: response.total_pages
            });
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = this._buildDetails(obj);
                let item = {
                    title: obj.name,
                    img: obj.thumb_url,
                    url: "/characters/" + obj.character_id,
                    details: details
                }
                var chars = this.state.characters.slice();
                chars.push(item);
                this.setState({ characters: chars });
            }
            this.setState({
                loading: false
            });
        });
    };

    componentDidMount() {
        this.fetchData();
    };

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container main-page">
                        <Title title="Characters"/>
                        <GridLayout items={this.state.characters}/>
                        <Pagination page={this.props.match.params.page} pagelimit={this.state.pageLimit} decPage={this.decPage} incPage={this.incPage}/>
                    </div>
                }
            </div>
        )
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }
    
    onRouteChanged() {
        this.changePage();
    }

    incPage = () => {
        this.props.history.push('/characters/page/' + (parseInt(this.props.match.params.page, 10) + 1));
        this.changePage();
    }

    decPage = () => {
        this.props.history.push('/characters/page/' + (parseInt(this.props.match.params.page, 10) - 1));
        this.changePage();
    }

    changePage = () => {
        this.setState({
            characters: [],
            loading: true
        }, () => { this.fetchData() });
    };

    _buildDetails(obj) {
        let details = []
        if(obj.gender) 
            details.push({ title: "Gender:", content: obj.gender});
        if(obj.species)
            details.push({title: "Species:", content: obj.species});
            if(obj.games)
            if(obj.games.length > 0)
                details.push({title: "Game:", content: obj.games[0].title});

        return details;
    }
}

export default CharactersPage;
