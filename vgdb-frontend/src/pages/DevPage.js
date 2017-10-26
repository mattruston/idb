import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';

const endpoint = pageNumber =>
                    `http://gamingdb.info/api/developer?page=${pageNumber}`

class DevPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            developers:[],
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
                    url: "/developers/" + obj.platform_id,
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
                    <div className="container">
                        <Title title="Developers"/>
                        <GridLayout items={this.state.developers}/>
                    </div>
                }
            </div>
        )
    }

    changePage(pageNumber) {
        this.setState({
            page: pageNumber,
            developers: [],
            loading: true
        });
        this.fetchData();
    };

    _buildDetails(obj) {
        let details = []
        if(obj.location) 
            details.push({ title: "Location:", content: obj.location});
        if(obj.average_rating)
            details.push({title: "Rating:", content: obj.average_rating})

        return details;
    }
}

export default DevPage;
