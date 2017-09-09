import React, { Component } from 'react';
import Featured from './Featured';

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
            </div>
        )
    }
}

export default Home;
