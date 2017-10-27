import React, { Component } from 'react';
import AboutCard from '../components/AboutCard';
import Title from '../components/Title';
import ToolCard from '../components/ToolCard'
import './About.css';

const gitEndpoint = "https://api.github.com/repos/mattruston/idb/stats/contributors";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Jaredk3nt: 0,
            jmpo1618: 0,
            derektolliver: 0,
            KishanRPatel: 0,
            mattruston:0 
        }
    }

    componentDidMount() {
        fetch(gitEndpoint, {
            method: 'GET'
        }).then(response => response.json())
        .then(response => {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var json = { };
                json[response[i].author.login] = response[i].total;
                this.setState(json);
            }
        });
    }
    
    render() {
        return (
            <div className="container main-page">
                <Title title="About"/>
                <h3>Motivation</h3>
                <p>Video games are a beloved childhood pastime that most people continue to enjoy well into adulthood. As a team, each of us grew up playing video games. Video games not only built friendships, but were a great way to experience a rich story with deep characters. There is nothing quite like getting a new game and playing it for the first time. Immersing yourself in a new game is an amazing feeling, but it can be hard to find new video games that you like. We created GamingDB so that people have a place to go to find a new game to play by providing information about everything that comes together to make a video game. From the developers who created the game to the major characters in the game, our site will provide users all the information they need about every aspect of a video game. We will provide information about video games, gaming platforms, major characters, and companies that develop video games. With these models, we will be able to create a great web of information that people can browse through whenever they want to find a new game to play.</p>
                <div className="about-grid">
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Jared Jones" description="Howdy, I'm Jared. I'm a senior CS student at UT." roles="Frontend" commits={this.state.Jaredk3nt} issues="15" tests="0" url="https://github.com/Jaredk3nt" image="https://avatars3.githubusercontent.com/u/6362515?s=460&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Juan Penaranda" description="Hi, I'm Juan. I'm a senior CS student at UT." roles="Backend" commits={this.state.jmpo1618}  issues="15" tests="0" url="https://github.com/jmpo1618" image="https://avatars0.githubusercontent.com/u/7012740?s=400&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Derek Tolliver" description="Hi, I'm Derek. I'm a senior CS student at UT." roles="Backend" commits={this.state.derektolliver}  issues="15" tests="0" url="https://github.com/derektolliver" image="https://avatars0.githubusercontent.com/u/8220914?s=400&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Kishan Patel" description="Hi, I'm Kishan. I'm a junior CS student at UT." roles="Frontend" commits={this.state.KishanRPatel}  issues="15" tests="0" url="https://github.com/KishanRPatel" image="https://avatars3.githubusercontent.com/u/25357245?s=400&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Matt Ruston" description="Hi, I'm Matt. I'm a senior CS student at UT." roles="Backend" commits={this.state.mattruston}  issues="15" tests="0" url="https://github.com/mattruston" image="https://avatars0.githubusercontent.com/u/10778569?s=400&v=4"/>
                    </div>
                </div>
                <ToolCard title="Tools" list={[
                    {name: "Trello", description:"Issue tracker"},
                    {name: "PlanItPoker", description:"Creating and estimating user stories"},
                    {name: "Google Domains", description:"Bought and registered our domain"},
                    {name: "Apiary", description:"API Documentation"},
                    {name: "Google Cloud Platform", description:"Used App Engine to deploy our site"},
                    {name: "Slack", description:"Used for team communication"},
                    {name: "Flask", description:"Python server engine to power all the api and forward all non-api routing to React"},
                    {name: "React", description:"Frontend engine to power all of our clientside rendering and routing"}
                    ]}/>
                <ToolCard title="Stats" list={[
                    {name: "Technical Report", description: "Technical report for IDB project", url:"https://utexas.app.box.com/file/241366436947"},
                    {name: "API Docs", description: "Apiary", url:"http://docs.vgdb1.apiary.io/#"},
                    {name: "Issue Tracker", description: "Trello", url:"https://trello.com/b/OBZSfuJU/idb"},
                    {name: "Repository", description: "Github", url:"http://github.com/mattruston/idb"},
                    {name: "Total Commits", description: this.state.Jaredk3nt + this.state.jmpo1618 + this.state.derektolliver + this.state.KishanRPatel + this.state.mattruston },
                    {name: "Issues", decription: "36" },
                    {name: "Unit Tests", description: "10" }
                ]}/>
                <ToolCard title="Data Scources" list={[
                    {name: "IGDB", description: "Main source of data", url:"https://igdb.github.io/api/about/welcome/"},
                    {name: "Giant Bomb", description: "Secondary source of data", url:"https://www.giantbomb.com/api/"},
                ]}/>
            </div>
        )
    }
}

export default About;
