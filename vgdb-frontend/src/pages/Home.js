import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';

const topPicks = [4, 13, 87, 106, 149, 178, 183, 186, 225, 281, 295, 296, 317, 474, 483, 585, 715, 720, 728, 861, 939];

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topgames: [],
            loading: true
        };
    }

    componentWillMount() { 
        this._fetchData();
    }

    render() {
        return (
            <div>
                {this.state.loading && <Loader/>}
                {!this.state.loading && 
                    <div className="container main-page">
                        <Title title="Team's Top Picks"/>
                        <GridLayout items={this.state.topgames}/>
                    </div>
                }
            </div>
        )
    }

    _fetchData() {
        for(let ep of topPicks) {
            fetch("https://gamingdb.info/api/game/" + ep, {method: 'GET'})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Failed to retrieve response object for game.');
            })
            .then(response => {
                let obj = response;
                let details = this._buildDetails(obj);
                let item = {
                    name: obj.name,
                    img: obj.image_url,
                    url: "/games/" + obj.game_id,
                    details: details
                }
                var arr = this.state.topgames.slice();
                arr.push(item);
                this.setState({ 
                    topgames: arr,
                    loading: false
                 });
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    _buildDetails(obj) {
        let details = []
        if(obj.release_date) 
            details.push({ title: "Released:", content:obj.release_date});
        if(obj.rating) 
            details.push({title: "Rating:", content: obj.rating.toFixed(0) + "/100"});
        if(obj.genres.length > 0)
            details.push({title: "Genre:", content:obj.genres[0].name});
        return details;
    }
}

export default Home;