import React, { Component } from 'react';
import Title from '../components/Title';
import AboutCard from '../components/AboutCard';
import './About.css';

class About extends Component {
    render() {
        return (
            <div className="container">
                <h1>About</h1>
                <div className="about-grid">
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Jared Jones" description="Howdy, I'm Jared. I'm a senior CS student at UT." roles="Frontend" commits="26" issues="15" tests="0" url="https://github.com/Jaredk3nt" image="https://avatars3.githubusercontent.com/u/6362515?s=460&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Juan Penaranda" description="Hi, I'm Juan. I'm a senior CS student at UT." roles="Backend" commits="26" issues="15" tests="0" url="https://github.com/jmpo1618" image="https://avatars0.githubusercontent.com/u/7012740?s=400&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Derek Tolliver" description="Hi, I'm Derek. I'm a senior CS student at UT." roles="Backend" commits="26" issues="15" tests="0" url="https://github.com/derektolliver" image="https://avatars0.githubusercontent.com/u/8220914?s=400&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Kishan Patel" description="Hi, I'm Kishan. I'm a senior CS student at UT." roles="Backend" commits="26" issues="15" tests="0" url="https://github.com/KishanRPatel" image="https://avatars2.githubusercontent.com/u/25357245?s=400&v=4"/>
                    </div>
                    <div className="about-card-wrapper">
                        <AboutCard 
                        name="Matt Ruston" description="Hi, I'm Matt. I'm a senior CS student at UT." roles="Backend" commits="26" issues="15" tests="0" url="https://github.com/mattruston" image="https://avatars0.githubusercontent.com/u/10778569?s=400&v=4"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;