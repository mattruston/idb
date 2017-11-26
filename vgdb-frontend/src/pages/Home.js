import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';
import Loader from '../components/Loader';
import { request, buildDetails } from '../components/Util';

const topPicks = [4, 13, 87, 106, 149, 178, 183, 186, 225, 281, 295, 296, 317, 474, 483, 585, 715, 720, 728, 861, 939];

const detailMap = {
    "release_date": "Released:",
    "rating": "Rating:",
    "genres": "Genre:"
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topgames: [],
            loading: true
        };
    }

    componentWillMount() { 
        this.fetchData();
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

    callback = (response) => {
        if (response) {
            let obj = response;
            let details = buildDetails(obj, detailMap);
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
        }
    }

    fetchData() {
        for(let ep of topPicks) {
            request("https://gamingdb.info/api/game/" + ep, this.callback);
        }
    }

}

export default Home;