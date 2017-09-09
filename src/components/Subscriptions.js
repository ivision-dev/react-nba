import React, { Component } from 'react';

class Subscriptions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			error: false,
			success: false
		}
	}

	saveSubscription = (email) => {
		const URL_EMAIL = 'http://localhost:3030/subscriptions';

		fetch(URL_EMAIL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email})
		}).then(response => response.json())
		.then(() => {
			this.setState({
				email: '',
				error: false,
				success: true
			})

			this.clearMessages();
		})
	}

	clearMessages = () => {
		setTimeout(function() {
			this.setState({
				error: false,
				success: false
			})
		}.bind(this), 2000);
	}

	handleInput = (event) => {
		this.setState({
			email: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let email = this.state.email;
		let regex = /\S+@\S+\.\S+/;

		regex.test(email) ? this.saveSubscription(email) : this.setState({error: true});

		this.clearMessages();
	}

	render() {
		return (
			<div className="subscribe-panel">
				<h3>Subscribe to us</h3>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input 
							type="text"
							placeholder="youremail@email.com"
							value={this.state.email}
							onChange={this.handleInput}
						/>
						<div className={this.state.error ? 'error show' : 'error'}>Please enter a valid e-mail</div>
						<div className={this.state.success ? 'success show' : 'success'}>You successfully signed up for our newsletter</div>
					</form>
					<small>
						Dinosaurs are extinct today because they lacked opposable thumbs and the brainpower to build a space program.
					</small>
				</div>
			</div>
		)
	}
}

export default Subscriptions;