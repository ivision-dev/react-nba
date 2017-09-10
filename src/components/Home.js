import React, { Component } from 'react';
import Featured from './Featured';
import Subscriptions from './Subscriptions';
import Blocks from './Blocks';
import Poll from './Poll';

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
                <Blocks blocks={this.state.home.blocks} />
                <Poll />
            </div>
        )
    }
}

export default Home;
