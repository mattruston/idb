import React, {Component} from 'react';
import { withRouter } from 'react-router'
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }
    render() {
        return (
            <div className="search-bar">
                <input className="search-bar-input" placeholder="Search" onChange={this.inputChange} onKeyPress={this.enterPressed}></input>
                <div className="search-bar-button" onClick={this.search} >
                    <img className="search-bar-button-img" src={require('../assets/search.svg')}/>
                </div>
            </div>
        );
    }

    enterPressed = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13) { 
            this.search();
        } 
    }

    inputChange = (e) => {
        this.setState({
            query: e.target.value
        });
    }
    search = () => {
        let query = this.state.query;
        query.replace(/\s/, '%20');
        this.props.history.push("/search/" + query);
    }
}

export default withRouter(SearchBar);