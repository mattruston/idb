import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';

let endpoint = pageNumber =>
                    `http://gamingdb.info/api/platform?page=${pageNumber}`
                
let pageLimit = 6;

class PlatformsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            platforms:[],
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
                    url: "/platforms/" + obj.platform_id,
                    details: details
                }
                var platforms = this.state.platforms.slice();
                platforms.push(item);
                this.setState({ platforms: platforms });
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
                        <Title title="Platforms"/>
                        <GridLayout items={this.state.platforms}/>
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
            platforms: [],
            loading: true
        }, () => { this.fetchData() });
    };

    _buildDetails(obj) {
        let details = []
        if(obj.release_date) 
            details.push({ title: "Released:", content:obj.release_date});

        return details;
    }
}

export default PlatformsPage;
