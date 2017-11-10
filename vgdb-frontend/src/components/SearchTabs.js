import React, {Component} from 'react';
import './styles/searchTabs.css';

class SearchTabs extends Component {
    render() {
        return (
            <div>
                <div className="tab-container">
                    {
                        this.props.tabs.map( (name) => {
                            return <div key={name} className="tab" onClick={this.props.changeTab(name)}>{name}</div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default SearchTabs;