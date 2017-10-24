import React, { Component } from 'react';
import AboutCard from '../components/AboutCard';
import Title from '../components/Title';
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
            for (var i = 0; i < response.length; i++) {
                var json = { };
                json[response[i].author.login] = response[i].total;
                this.setState(json);
            }
        });
    }
    
    render() {
        return (
            <div className="container">
                 <Title title="About"/>
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
            </div>
        )
    }
}

export default About;
