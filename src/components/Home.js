import React, { Component } from 'react';
import Featured from './Featured';
import Subscriptions from './Subscriptions';

const URL_HOME = 'http://localhost:3030/home';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            home: ''
        }
    }

    componentDidMount() {
        fetch(URL_HOME, {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    home: data
                })
            });
    }

    render() {
        return (
            <div>
                <Featured slides={this.state.home.slider} />
                <Subscriptions />
            </div>
        )
    }
}

export default Home;
