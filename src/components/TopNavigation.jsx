import React from "react";
import { NavLink } from 'react-router-dom'
import PropTypes from "prop-types";

const TopNavigation = ({ showForm }) => {
	return (
		<div className="ui secondary pointing menu">
			<NavLink exact to="/" className="item">
				<i className="icon home" />Home
      </NavLink>

			<NavLink exact to="/films" className="item" >
				<i className="icon films" /> Films
		</NavLink>

			<NavLink exact to="films/new" className="item">
				<i className="icon plus" />
        Add new film
      </NavLink>
		</div>
	);
};

TopNavigation.propTypes = {

};

export default TopNavigation;
