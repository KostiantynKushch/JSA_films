import React, { Component, createRef } from "react";
import ImageLoader from "components/ImageLoader";
import FormMessage from "components/FormMessage";
import PropTypes from "prop-types";

const initialData = {
	_id: null,
	title: "",
	img: "",
	description: "",
	director: "",
	price: "",
	duration: "",
	featured: false,
};

class FilmForm extends Component {
	state = {
		data: initialData,
		errors: {},
		loading: false,
	};

	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;
		if (this.props.film._id) {
			this.setState({ data: this.props.film })
		}
	}

	componentDidMount() {
		if (this.props.film._id) {
			this.setState({ data: this.props.film });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.film._id && this.props.film._id !== prevProps.film._id) {
			this.setState({ data: this.props.film });
		} else if (!this.props.film._id && prevProps.film._id) {
			this.setState({ data: initialData });
		}
	}

	photoRef = createRef();

	updatePhoto = e => {
		const file = this.photoRef.current.files && this.photoRef.current.files[0];
		if (file) {
			const img = "/img/" + file.name;
			this.setState({ data: { ...this.state.data, img } });
		}
	};

	handleStringChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value },
			errors: { ...this.state.errors, [e.target.name]: "" },
		});

	handleNumberChange = e => {
		let value = parseFloat(e.target.value);
		value = isNaN(value) || value === 0 ? "" : Math.abs(value);
		this.setState({
			data: { ...this.state.data, [e.target.name]: value },
			errors: { ...this.state.errors, [e.target.name]: "" },
		});
	};
	handleCheckboxChange = e =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.checked },
		});

	validate(data) {
		const errors = {};
		if (!data.title) errors.title = "Title can't be blank";
		if (!data.img) errors.img = "Image can't be blank";
		if (!data.description) errors.description = "Description can't be blank";
		if (!data.duration) errors.duration = "Duration can't be blank";
		if (!data.price) errors.price = "Price can't be blank";
		if (!data.director) errors.director = "Director can't be blank";

		if (parseInt(data.duration) < 0)
			errors.duration = "Duration can't be negative";
		if (parseInt(data.price) < 0) errors.price = "Price can't be negative";
		return errors;
	}

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.saveFilm(this.state.data)
				.then(() => {
					if (this._isMounted) {
						this.setState({ data: initialData, errors: {}, loading: false })
					}
				})
		}
	};

	render() {
		const { data, errors, loading } = this.state;
		return (
			<form onSubmit={this.handleSubmit} className={`ui form ${loading ? 'loading' : ''}`}>
				<div className="ui grid mb-3">
					{/* <!-- two column row START --> */}
					<div className="two column row">
						{/* <!-- left  column  START  --> */}
						<div className="ten wide column">
							{/* <!-- title START   --> */}
							<div className={`field ${errors.title ? "error" : ""}`}>
								<label htmlFor="title">Film title</label>
								<input
									value={data.title}
									onChange={this.handleStringChange}
									type="text"
									name="title"
									id="title"
									placeholder="film title"
								/>
								{errors.title && <FormMessage>{errors.title}</FormMessage>}
							</div>
							{/* <!-- title END   --> */}

							{/* <!-- image field START   --> */}
							<div className={`field img-grid ${errors.img ? "error" : ""}`}>
								<label htmlFor="img">Image</label>
								<input
									value={data.img}
									onChange={this.handleStringChange}
									name="img"
								/>
								{errors.img && <FormMessage>{errors.img}</FormMessage>}
								<div className="inp-file">
									<label htmlFor="photo">Photo</label>
									<input
										ref={this.photoRef}
										onChange={this.updatePhoto}
										type="file"
										id="photo"
									/>
								</div>
							</div>
							{/* <!-- image field END  --> */}
						</div>
						{/* <!-- left  column  END  --> */}

						{/* <!-- right column START   --> */}
						<div className="six wide column">
							<ImageLoader
								src={data.img}
								fallbackImg="http://via.placeholder.com/250x250"
								className="ui image imgfit"
								alt={data.title}
							/>
						</div>
						{/* <!-- right column  END   --> */}
					</div>
					{/* <!--/ two column   --> */}

					{/* <!-- description START   --> */}
					<div
						className={`column row field ${errors.description ? "error" : ""}`}
					>
						<label htmlFor="description">Film description</label>
						<textarea
							value={data.description}
							onChange={this.handleStringChange}
							name="description"
							id="description"
							placeholder="film description"
						></textarea>
						{errors.description && (
							<FormMessage>{errors.description}</FormMessage>
						)}
					</div>
					{/* <!-- description END   -->  */}

					{/* <!--  three column row START --> */}
					<div className="three column row">
						{/* <!-- director START --> */}
						<div className={`column field ${errors.director ? "error" : ""}`}>
							<label htmlFor="director">Director</label>
							<input
								value={data.director}
								onChange={this.handleStringChange}
								type="text"
								name="director"
								id="director"
								placeholder="film director"
							/>
							{errors.director && <FormMessage>{errors.director}</FormMessage>}
						</div>
						{/* <!--  director END  --> */}

						{/* <!--   duration START --> */}
						<div className={`column field ${errors.duration ? "error" : ""}`}>
							<label htmlFor="duration">Duration</label>
							<input
								value={data.duration}
								onChange={this.handleNumberChange}
								type="number"
								name="duration"
								id="duration"
								placeholder="Duration"
							/>
							{errors.duration && <FormMessage>{errors.duration}</FormMessage>}
						</div>
						{/* <!-- duration  END--> */}

						{/* <!--  price START  --> */}
						<div className={`column field ${errors.price ? "error" : ""}`}>
							<label htmlFor="price">Price</label>
							<input
								value={data.price}
								onChange={this.handleNumberChange}
								type="number"
								name="price"
								id="price"
								placeholder="price"
							/>
							{errors.price && <FormMessage>{errors.price}</FormMessage>}
						</div>
						{/* <!--  price  END--> */}
					</div>
					{/* <!-- / three column row END  --> */}

					{/* <!--  featured START --> */}
					<div className="six wide column inline field">
						<label htmlFor="featured">Featured</label>
						<input
							value={data.featured}
							onChange={this.handleCheckboxChange}
							type="checkbox"
							name="featured"
							id="featured"
						/>
					</div>
					{/* <!--  featured END --> */}

					{/* <!-- Buttons START --> */}
					<div className="ui fluid buttons">
						<button className="ui button primary" type="submit">
							Save
            </button>
						<div className="or"></div>
						<span onClick={this.props.hideForm} className="ui button">
							Hide form
            </span>
					</div>
					{/* <!-- Buttons  END --> */}
				</div>
			</form>
		);
	}
}

FilmForm.propTypes = {
	hideForm: PropTypes.func.isRequired,
	saveFilm: PropTypes.func.isRequired,
	film: PropTypes.object.isRequired,
};

export default FilmForm;
