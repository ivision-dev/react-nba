import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

const URL_PLAYERS = 'http://localhost:3030/player';
const fadeAnimation = {
	transitionName: 'fade',
	transitionAppear: true,
	transitionAppearTimeout: 500,
	transitionEnter: true,
	transitionEnterTimeout: 500,
	transitionLeave: true,
	transitionLeaveTimeout: 500
}

class Players extends Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
			filtered: [],
			keyword: ''
		}
	}

	componentDidMount() {
		fetch(URL_PLAYERS, {method: 'GET'})
			.then(response => response.json())
			.then(json => {
				this.setState({
					players: json,
					filtered: json
				})
			})
	}

	renderPlayers = ({filtered}) => {
		return filtered.map((player) => {
			return (
				<Link 
					to={`/players/${player.player_id}`} 
					key={player.player_id} 
					className="player-item">
						<img src={player.image} alt="player.name"/>
						<h4>{player.name}</h4>
				</Link>
			)
		})
	}

	render() {
		return (
			<div className="players-component">
				<div className="players-input">
					<input 
						value={this.state.keyword}
						type="text"
						placeholder="Search for a player"
					/>
				</div>
				<div className="players-container">
					<CSSTransitionGroup {...fadeAnimation}>
						{this.renderPlayers(this.state)}
					</CSSTransitionGroup>
				</div>
			</div>
		)
	}
}

export default Players;