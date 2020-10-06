import React, {Component} from "react";

const initialData = {
  title: "",
};

class FilmForm extends Component {
  state = {
    data: initialData,
  };

  handleStringChange = e =>
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value},
    });

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.data);
  };

  render() {
    const {data} = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <div className="ui grid mb-3">
          {/* two column start */}
          <div className="two column row">
            {/* <!-- left  column  START  --> */}
            <div className="ten wide column">
              {/* <!-- title START   --> */}
              <div className="field">
                <label htmlFor="title">Film title</label>
                <input
                  onChange={this.handleStringChange}
                  value={data.title}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
              </div>
              {/* <!-- title END   --> */}
            </div>
          </div>
          {/* two column end */}
        </div>
        {/* ui grid */}
        {/* <!-- Buttons START --> */}
        <div className="ui fluid buttons">
          <button className="ui button primary" type="submit">
            Save
          </button>
          <div className="or"></div>
          <span className="ui button">Hide form</span>
        </div>
        {/* <!-- Buttons  END --> */}
      </form>
    );
  }
}

export default FilmForm;
