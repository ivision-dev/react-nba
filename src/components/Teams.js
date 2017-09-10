import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

const URL_TEAMS = 'http://localhost:3030/teams';
const fadeAnimation = {
	transitionName: 'fade',
	transitionAppear: true,
	transitionAppearTimeout: 500,
	transitionEnter: true,
	transitionEnterTimeout: 500,
	transitionLeave: true,
	transitionLeaveTimeout: 500
}

class Teams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
			filtered: [],
			keyword: ''
		}
	}

	componentDidMount() {
		fetch(URL_TEAMS, {method: 'GET'})
			.then(response => response.json())
			.then(json => {
				this.setState({
					teams: json,
					filtered: json
				})
			})
	}

	filterTeam = (event) => {
		const keyword = event.target.value;
		if(keyword !== '') {
			const list = this.state.teams.filter((item) => {
				return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
			})
			this.setState({
				filtered: list,
				keyword
			})
		} else {
			this.setState({
				filtered: this.state.teams, 
				keyword
			})
		}
	}

	renderTeams = ({filtered}) => {
		return filtered.map((item) => {
			return (
				<Link 
					to={`/team/${item.name}`} 
					key={item.id} 
					className="team-item">
						<img src={`/images/teams/${item.logo}`} alt="item.name"/>
				</Link>
			)
		})
	}

	render() {
		return (
			<div className="teams-component">
				<div className="teams-input">
					<input 
						value={this.state.keyword}
						type="text"
						placeholder="Search for a team" 
						onChange={event => this.filterTeam(event)}
					/>
				</div>
				<div className="teams-container">
					<CSSTransitionGroup {...fadeAnimation}>
						{this.renderTeams(this.state)}
					</CSSTransitionGroup>
				</div>
			</div>
		)
	}
}

export default Teams;