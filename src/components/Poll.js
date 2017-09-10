import React, { Component } from 'react';

const URL_HOME = 'http://localhost:3030/teams';

class Poll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pollTeams: []
		}
	}

	componentDidMount() {
		this.fetchPollData();
	}

	fetchPollData() {
		fetch(`${URL_HOME}?poll=true&_sort=count&_order=desc`, {method: 'GET'})
			.then(response => response.json())
			.then(json => {
				this.setState({
					pollTeams: json
				})
			})
	}

	addCount(count, id) {
		fetch(`${URL_HOME}/${id}`, {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({count: count + 1})
		})
		.then(() => {
			this.fetchPollData()
		})
	}

	renderPoll() {
		const position = ['1ST', '2ND', '3RD', '4TH', '5TH'];
		return this.state.pollTeams.map((team, i) => {
			return (
				<div 
					key={team.id} 
					className="poll-item" 
					onClick={() => this.addCount(team.count, team.id)}>
					<img src={`/images/teams/${team.logo}`} alt={team.name}/>
					<h4>{position[i]}</h4>
					<div>{team.count} Votes</div>
				</div>
			)
		})
	}

	render() {
		return (
			<div className="home-poll">
				<h3>Who's going to dethrone the Warriors?</h3>
				<div className="poll-container">
					{this.renderPoll()}
				</div>
			</div>
		)
	}
}

export default Poll;