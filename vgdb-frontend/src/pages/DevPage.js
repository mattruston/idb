import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';

const endpoint = pageNumber =>
                    `http://gamingdb.info/api/developer?page=${pageNumber}`

class DevPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            developers:[],
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
                    url: "/developers/" + obj.developer_id,
                    details: details
                }
                var devs = this.state.developers.slice();
                devs.push(item);
                this.setState({ developers: devs });
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
                        <Title title="Developers"/>
                        <GridLayout items={this.state.developers}/>
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
        this.props.history.push('/developers/page/' + (parseInt(this.props.match.params.page, 10) + 1));
        this.changePage();
    }

    decPage = () => {
        this.props.history.push('/developers/page/' + (parseInt(this.props.match.params.page, 10) - 1));
        this.changePage();
    }

    changePage = () => {
        this.setState({
            developers: [],
            loading: true
        }, () => { this.fetchData() });
    };

    _buildDetails(obj) {
        let details = []
        if(obj.location) 
            details.push({ title: "Location:", content: obj.location});
        if(obj.average_rating)
            details.push({title: "Average Rating:", content: obj.average_rating});
        if(obj.games)
            if(obj.games.length > 0)
                details.push({title: "Game:", content: obj.games[0].title});

        return details;
    }
}

export default DevPage;
