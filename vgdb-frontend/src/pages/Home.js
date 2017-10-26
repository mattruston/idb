import React, { Component } from 'react';
import GridLayout from '../components/GridLayout';
import Title from '../components/Title';

const jaredURLs = ["200"]

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jared: []
        };
    }

    componentWillMount() { 
        this._fetchData();
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Title title="Jared's Favorite Games"/>
                    <GridLayout items={this.state.jared}/>
                </div>
            </div>
        )
    }

    _fetchData() {
        for(let ep of jaredURLs) {
            fetch("https://gamingdb.info/api/game/" + ep,{
                method: 'GET'
            }).then(response => response.json())
            .then(response => {
                let obj = response;
                let details = this._buildDetails(obj);
                let item = {
                    title: obj.title,
                    img: obj.image_url,
                    url: "/games/" + obj.game_id,
                    details: details
                }
                var arr = this.state.jared.slice();
                arr.push(item);
                this.setState({ jared: arr });
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
            details.push({title: "Genre:", content:obj.genres[0]});

        return details;
    }
}

export default Home;