import React, {Component} from 'react';
import {Pie, PieChart, Cell, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar} from 'recharts';

class Viz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modelsPieData = [];
        }
    }

    componentDidMount() {
        this.buildModelsPie();
    }

    render() {
        const width = 400, height = 300;
        const PieData = [
            { name: "Val 1", value: 100 },
            { name: "Val 2", value: 200 },
            { name: "Val 3", value: 300 },
        ];
        const BarData = [
            {name: 'Players', c: 4000, f: 2400, g: 2400},
        ];
        const COLORS = ["#2DE5C6", "#173753", "#5863F8"];

        return(
            <div className="container main-page">
                <div className="graph-container">
                    <span className="graph">
                        <PieChart width={width} height={height}>
                            <Pie data={this.state.modelsPieData} dataKey="value" cx={width/2} cy={height/2} outerRadius={80} label={(obj)=> obj.name}>
                                { PieData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>) }
                            </Pie>
                        </PieChart>
                    </span>
                    <div className="graph-text">
                        This is a pie chart that shows some data!
                    </div>
                </div>
                <div className="graph-container">
                    <span className="graph">
                        <BarChart   width={width} height={height} data={BarData}
                                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="c" fill={COLORS[0]} />
                            <Bar dataKey="f" fill={COLORS[1]} />
                            <Bar dataKey="g" fill={COLORS[2]} />
                        </BarChart>
                    </span>
                    <div className="graph-text">
                        This is a bar chart that shows the distribution of positions in the GameDayBallers db!
                    </div>
                </div>
            </div>
        );
    }

    buildModelsPie = () => {
        fetch(
            endpoint(this.props.match.params.page, 
                JSON.stringify(this.state.filter), 
                JSON.stringify(this.state.sort)),
            { method: 'GET' })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Failed to retrieve response object for game.');
        })
        .then(response => {
            this.setState({
                pageLimit: response.total_pages
            });
            for (var i = 0; i < response.objects.length; i++) {
                let obj = response.objects[i];
                let details = this._buildDetails(obj);
                let item = {
                    name: obj.name,
                    img: obj.thumb_url,
                    url: "/games/" + obj.game_id,
                    details: details
                }
                var gamesArray = this.state.games.slice();
                gamesArray.push(item);
                this.setState({ games: gamesArray });
            }
            this.setState({
                loading: false
            });
        })
        .catch(error => {
            console.log(error);
        });
    };
    }
}

export default Viz;