import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const attr = ["description", "genre", "title"]

class SearchItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            context: "",
            searchTerms: this.props.query.split(" ")
        }
    }

    render() {
        const style = {
            backgroundImage: "url(" + this.props.obj.image_url + ")"
        }
        return (
            <Link to={this.props.link} className="search-item-container">
                <div className="search-item-thumbnail" style={style}/><div className="search-item-content">
                    <div className="search-item-title">{ this.contextTitle() }</div>
                    <hr/>
                    { this.contextFinder().map( (i) => i ) }
                    {this.props.obj.genres && this.contextGenre()}
                </div>
            </Link>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.setState({
            searchTerms: this.props.query.split(" ")
        })
    }

    contextTitle = () => {
        let titleArr = this.props.obj.name.split(" ");

        return (
            <span>{
                titleArr.map( (word) => {
                    for(let term of this.state.searchTerms) {
                        let re = new RegExp(term, "i");
                        if(re.test(word)) {
                            return (
                                <span className="search-highlight">{word} </span>
                            )
                        }
                    }
                    return (
                        <span>{word} </span>
                    ) 
                })
            }</span>
        )
    }

    contextGenre = () => {
        let genreArr = [];
        for( let genre of this.props.obj.genres ) {
            genreArr.push(genre.name);
        }
        let lastIndex = genreArr.length - 1;
        return (
            <span><strong> Genres: </strong> {
                genreArr.map( (word, index) => {
                    for(let term of this.state.searchTerms) {
                        let re = new RegExp(term, "i");
                        if(re.test(word)) {
                            return (
                                <span>
                                    <span className="search-highlight"><strong>{word}</strong></span>
                                    {index != lastIndex ? ", " : ""} 
                                </span>
                            )
                        }
                    }
                    return (
                        <span>
                            <span>{word}</span>
                            {index != lastIndex ? ", " : ""} 
                        </span>
                    )
                })
            }</span>
        )

    }

    contextFinder = () => {
        let context = [];
        if(this.props.obj.description === null || this.props.obj.description === "") {
            return context;
        }
        let desc = this.props.obj.description.split(" ");
        for(let i in desc) {
            for(let term of this.state.searchTerms) {
                let re = new RegExp(term, "i");
                if(re.test(desc[i])) { //desc[i].toLowerCase() === term.toLowerCase()) {
                    let surroundFront = [];
                    let surroundBack = [];
                    let index = Math.max(0, parseInt(i) - 5);
                    for(index; index < i; index++) {
                        surroundFront.push(desc[index]);
                    }
                    index = parseInt(i) + 1;
                    for(index; index < desc.length && index < (parseInt(i) + 5); index++) {
                        surroundBack.push(desc[index]);
                    }
                    context.push(
                        <div className="search-item-description">
                            ...{surroundFront.join(' ')} <strong>{desc[i]}</strong> {surroundBack.join(' ')}... 
                        </div>
                    );
                }
            }
            if(context.length > 2) {
                break;
            }
        }
        if(context.length < 1) {
            context.push(
                <div className="search-item-description">
                    {this.props.obj.description.substring(0, 100)}...
                </div>
            )
        }
        return context;
    }
}

export default SearchItem;