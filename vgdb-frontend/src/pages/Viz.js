import React, {Component} from 'react';
import {request} from '../components/Util';
import GDBPieChart from '../components/viz-components/GDBPieChart';
import GDBBarChart from '../components/viz-components/GDBBarChart';
import GDBLineChart from '../components/viz-components/GDBLineChart';

const url = "http://api.gamedayballers.me/";
const modelTypes = ["players", "coaches", "teams", "divisions"];

class Viz extends Component {

    constructor(props) {
        super(props);
        this.model
        this.state = {
            modelsPieData: [],
            playerPositions: [{ "C": 0, "F": 0, "G": 0 }],
            playerHeights: [], // { name: "6-8", value: 100 }
            players: 0,
        }
    }

    componentWillMount() {
        this.getPlayers();
        //this.buildModelsPie()
    }

    render() {
        const width = 400, height = 300;
        const BarData = [
            {name: 'Players', c: 4000, f: 2400, g: 2400},
        ];
        const COLORS = ["#2DE5C6", "#5863F8", "#65DEF1", "#173753", "#EDAC17", ];

        let reducer = (arr) => {
            return arr.reduce((a, b) => a + b.value, 0);
        }

        let minHeight = () => this.state.playerHeights.length > 1 ? this.state.playerHeights[0].name : 0.0;
        let maxHeight = () => this.state.playerHeights.length > 1 ? this.state.playerHeights[this.state.playerHeights.length - 1].name : 0.0;
        let argMaxHeight = () => {
            let max = 0;
            let arg = 0;
            this.state.playerHeights.map((height) => {
                if(height.value > max) {
                    max = height.value;
                    arg = height.name;
                }
            });
            return arg;
        }

        return(
            <div className="container main-page">
                <h1>GameDayBallers DB Visualization</h1>
                <div className="graph-container">
                    <span className="graph">
                        <GDBPieChart data={this.state.modelsPieData} width={width} height={height} colors={COLORS}/>
                    </span>
                    <div className="graph-text">
                        <h3>Model Distribution</h3>
                        <p>GameDayBallers have <strong>{this.state.modelsPieData.length}</strong> models in their database, made up by {
                            this.state.modelsPieData.map(model => <span key={model.name}><strong>{model.value}</strong> {model.name} </span>)
                        } totaling <strong>{reducer(this.state.modelsPieData)}</strong> objects.</p>
                    </div>
                </div>
                <div className="graph-container">
                    <span className="graph">
                        <GDBBarChart data={this.state.playerPositions} height={height} width={width} keys={["C", "F", "G"]} colors={COLORS}/>
                    </span>
                    <div className="graph-text">
                        <h3>Player Positions</h3>
                        <p>In the players model each player has a position. Of the <strong>{this.state.players}</strong> players there are {
                            Object.entries(this.state.playerPositions[0]).map(([pos, count]) => <span key={pos}><strong>{count}</strong> {pos} </span>)
                        }</p>
                        <p>* Where <strong>G</strong> = Guard, <strong>C</strong> = Center, <strong>F</strong> = Forward
                        </p>
                    </div>
                </div>
                <div className="graph-container">
                    <span className="graph">
                        <GDBLineChart data={this.state.playerHeights} height={height} width={width} keys={["value"]} colors={COLORS}/>
                    </span>
                    <div className="graph-text">
                        <h3>Player Height Distributions</h3>
                        <p>In GameDayBallers db, players range from <strong>{minHeight()} ft.</strong> to <strong>{maxHeight()} ft.</strong> with the largest amount of players standing <strong>{argMaxHeight()} ft.</strong> tall.</p>
                    </div>
                </div>
            </div>
        );
    }

    buildModelsPie = () => {
        for(let model of modelTypes) {
            request(url + model + "/", (request) => {
                this.setState({ 
                    ...this.state,
                    modelsPieData: [...this.state.modelsPieData, { name: model, value: request.length }] 
                });
            });
        }
    }

    getPlayers = () => {
        request(url + "players_full/", (request) => {
            let posObj = this.state.playerPositions.slice()[0];
            let heightCounter = {};
            for(let player of request) {
                // calculate positions
                let pos = player.position.split("-");
                for(let p of pos) {
                    posObj[p]++;
                }
                //calculate height
                // convert string to actual height
                let hvals = player.height.split("-");
                hvals[0] = parseInt(hvals[0]);
                if(hvals[1] !== undefined) {
                    hvals[0] = hvals[0] + parseInt(hvals[1])/12;
                }
                let height = hvals[0].toFixed(2);//.toFixed(2);
                if(height in heightCounter) {
                    heightCounter[height]++;
                } else {
                    heightCounter[height] = 1;
                }
            }
            //create formatted array for heights
            let heights = [];
            Object.entries(heightCounter).map(([height, count]) => {
                heights.push({name: height, value: count});
            });
            //sort height array
            heights.sort(function(a, b){
                let keyA = a.name,
                    keyB = b.name;
                // Compare the 2 dates
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });
            this.setState({
                ...this.state,
                playerPositions: [posObj],
                playerHeights: heights,
                players: request.length
            }, () => {
                this.buildModelsPie();
            });
        });
    }
}

export default Viz;