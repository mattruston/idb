import React, {Component} from 'react';

/*
 * Props: endpoint, 
 */
class HttpHandler extends Component {
    componentDidMount() {
        console.log("HTTP mounted");
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.onRouteChanged();
        }
    }

    fetchData = () => {
        fetch(this.props.endpoint)
            .then( response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Failed to retrieve response object for game.');
            })
            .then( response => {
                console.log("callback");
                this.props.callback(response);
            })
            .catch( error => {
                console.log(error);
            });
    }

    render() {
        return (
            <span></span>
        );
    }
}

export default HttpHandler;