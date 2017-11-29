import React, {Component} from 'react';
import {request} from '../components/Util';
import GDBPieChart from '../components/viz-components/GDBPieChart';
import GDBBarChart from '../components/viz-components/GDBBarChart';
import GDBLineChart from '../components/viz-components/GDBLineChart';
import GDBScatterPlot from '../components/viz-components/GDBScatterPlot';

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
            playerBmi: [],
            players: 0,
            coachAges: [
                { name: "under 30", value: 0},
                { name: "30-40", value: 0},
                { name: "41-50", value: 0},
                { name: "51-60", value: 0},
                { name: "over 60", value: 0},
            ],
            coaches: 0,
        }
    }

    componentWillMount() {
        this.getPlayers();
    }

    render() {
        const width = 400, height = 300;
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
        let argMaxAge = () => {
            let max = 0;
            let arg = 0;
            this.state.coachAges.map((age) => {
                if(age.value > max) {
                    max = age.value;
                    arg = age.name;
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
                <div className="graph-container">
                    <span className="graph">
                        <GDBScatterPlot data={this.state.playerBmi} height={height} width={width} keys={["height", "weight"]} colors={COLORS}/>
                    </span>
                    <div className="graph-text">
                        <h3>Player Weight vs Height</h3>
                        <p>A relatively uninteresting distribution of players weight vs their height.</p>
                    </div>
                </div>
                <div className="graph-container">
                    <span className="graph">
                        <GDBBarChart data={this.state.coachAges} height={height} width={width} keys={["value"]} colors={COLORS}/>
                    </span>
                    <div className="graph-text">
                        <h3>Coach Ages</h3>
                        <p>Out of <strong>{this.state.coaches}</strong> coaches, the majority of them are in the age group <strong>{argMaxAge()}.</strong></p>
                    </div>
                </div>
            </div>
        );
    }

    getCoaches = () => {
        request(url + "coaches_full/", (response) => {
            let ageObj = this.state.coachAges.slice();
            for(let coach of response) {
                // Turn the dob to a integer year
                let birth = coach.dob.length > 4 ? 
                    parseInt(coach.dob.slice(coach.dob.length - 5)) : parseInt(coach.dob);
                let age = 2017 - birth;
                //Aggregate the count for the category the coach belongs to
                switch(true) {
                    case age > 60:
                        ageObj[4].value++;
                        break;
                    case age > 50:
                        ageObj[3].value++;
                        break;
                    case age > 40:
                        ageObj[2].value++;
                        break;
                    case age > 30:
                        ageObj[1].value++;
                        break;
                    case age < 30:
                        ageObj[0].value++;
                        break;
                }
            }
            this.setState({
                ...this.state,
                coachAges: ageObj,
                coaches: response.length
            })
        });
    }

    buildModelsPie = () => {
        for(let model of modelTypes) {
            // get the count of each model type with a basic request
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
            let bmi = [];
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
                //get height vs weight scatter
                bmi.push({height: parseFloat(height), weight: player.weight});
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
                playerBmi: bmi,
                players: request.length
            }, () => {
                // Make these calls later to prevent layout thrashing
                this.buildModelsPie();
                this.getCoaches();
            });
        });
    }
}

export default Viz;