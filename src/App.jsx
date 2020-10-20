import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import TopNavigation from "components/TopNavigation";
import HomePage from 'pages/HomePage'
import FilmsPage from 'pages/FilmsPage'
import SignupPage from 'pages/SignupPage'


const initUser = {
	token: 'test',
	role: 'user'
}


class App extends Component {

	state = {
		user: initUser
	}

	logout = () => this.setState({ user: { token: null } })

	render() {
		const { user } = this.state;
		return (
			<div className="ui container mt-3">
				<TopNavigation logout={this.logout} isAuth={!!user.token} />
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route path="/films">
						<FilmsPage />
					</Route>
					<Route path="/signup" >
						<SignupPage />
					</Route>

				</Switch>
			</div>
		);
	}
}

export default App;
