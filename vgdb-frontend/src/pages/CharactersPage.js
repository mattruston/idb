import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';

let endpoint = pageNumber =>
                    `http://gamingdb.info/api/character?page=${pageNumber}`

let pageLimit = 51;

class CharactersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            characters:[],
            loading: true
        };
    };

    fetchData() {
        fetch(endpoint(this.state.page),{
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = this._buildDetails(obj);
                let item = {
                    title: obj.name,
                    img: obj.image_url,
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
                        <div>{"Page Number: " + this.state.page + "/" + pageLimit}</div>
                        <button onClick={this.decPage} disabled={this.state.page == 1}>Previous Page</button>
                        <button onClick={this.incPage} disabled={this.state.page == pageLimit}>Next Page</button>
                    </div>
                }
            </div>
        )
    }

    incPage = () => {
        this.changePage(this.state.page + 1);
    }

    decPage = () => {
        this.changePage(this.state.page - 1);
    }

    changePage = (page) => {
        this.setState({
            page: page,
            characters: [],
            loading: true
        }, () => { this.fetchData() });
    };

    _buildDetails(obj) {
        let details = []
        if(obj.gender) 
            details.push({ title: "Gender:", content: obj.gender});
        if(obj.species)
            details.push({title: "Species:", content: obj.species})

        return details;
    }
}

export default CharactersPage;
