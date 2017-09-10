import React, { Component } from 'react';

const URL_TEAMS = 'http://localhost:3030/teams';
const URL_ROSTER = 'http://localhost:3030/player';

class Team extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			player: []
		}
	}

	componentDidMount() {
		fetch(`${URL_TEAMS}?name=${this.props.match.params.id}`, {method: 'GET'})
			.then(response => response.json())
			.then(json => { 
				this.setState({
					data: json
				})
			})
			.then(() => { this.fetchTeamRoster() });
	}

	renderTeamData = ({data}) => {
		return data.map((item) => {
			return (
				<div key={item.id} className="team-data-wrapper">
					<div className="left">
						<img src={`/images/teams/${item.logo}`} alt={item.name}/>
					</div>
					<div className="right">
						<h1>{item.city} {item.name}</h1>
						<img className="conference" src={`/images/${item.conference}.gif`} alt={item.conference} />
						<div className="team-details">
							<h4>Division:</h4>
							<span>{item.division}</span><br />
							<h4>All-Time-Record:</h4>
							<span>Regular Season: </span>{item.record.regSeason}<br />
							<span>Playoffs: </span>{item.record.playoffs}<br />
							<h4>Championships:</h4>
							<span>{item.championships.length}</span><br />
							<span>{item.championships.map(year => `${year}, `)}</span>
						</div>
						<hr />
						<div className="roster">
							{this.renderTeamRoster(this.state.player)}
						</div>
					</div>
				</div>
			)
		})
	}

	renderTeamRoster = (roster) => {
		return roster.map((item) => {
			return (
				<div key={item.name} className="item-player-wrapper">
					<img src={item.image} alt={item.name} />
					<h4>{item.name}</h4>
					<div className="node">
						<span>Position:</span>{item.pos}
					</div>
					<div className="node">
						<span>Height:</span>{item.height}
					</div>
					<div className="node">
						<span>Weight:</span>{item.weight}
					</div>
				</div>
			)
		})
	}

	fetchTeamRoster = () => {
		fetch(`${URL_ROSTER}?team_id=${this.state.data[0].id}`, {method: 'GET'})
			.then(response => response.json())
			.then(json => {
				this.setState({
					player: json
				})
			})
	}


	render() {
		return (
			<div className="team-data">
				{this.renderTeamData(this.state)}
			</div>
		)
	}
}

export default Team;