import React, {Component} from 'react';

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
        return (
            <a className="search-item-container">
                <img className="search-item-thumbnail" src={this.props.obj.image_url}/><div className="search-item-content">
                    <div className="search-item-title">{this.props.obj.name}</div>
                    <hr/>
                    { this.contextFinder().map( (i) => i ) }
                </div>
            </a>
        );
    }

    contextFinder = () => {
        let context = [];
        let desc = this.props.obj.description.split(" ");
        for(let i in desc) {
            for(let term of this.state.searchTerms) {
                if(desc[i].toLowerCase() === term.toLowerCase()) {
                    let surroundFront = [];
                    let surroundBack = [];
                    let index = Math.max(0, parseInt(i) - 5);
                    for(index; index < i; index++) {
                        surroundFront.push(desc[index]);
                    }
                    index = parseInt(i) + 1;
                    console.log("index: " + index + " desc: " + desc.length);
                    for(index; index < desc.length && index < (parseInt(i) + 5); index++) {
                        console.log(desc[index]);
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