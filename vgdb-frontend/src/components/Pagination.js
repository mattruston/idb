import React, {Component} from 'react';

class Pagination extends Component {
    render() {
        return (
            <div className="pagination">
            <div className="buttons-holder">
                <button className="pagination-button right" onClick={this.props.decPage} disabled={this.props.page === 1}>Previous Page</button>
                <button className="pagination-button left" onClick={this.props.incPage} disabled={this.props.page === this.props.pagelimit}>Next Page</button>
            </div>
            <div className="page-number">{this.props.page + "/" + this.props.pagelimit}</div>
        </div>
        );
    }
}

export default Pagination;