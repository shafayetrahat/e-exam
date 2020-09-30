import React, { Component } from "react";

class Counter extends Component {
  getCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }

  render() {
    // console.log(this.props);
    return this.renderTags();
  }
  renderTags() {
    return (
      <div>
        <ul>
          <span className="badge badge-primary m-2">{this.getCount()}</span>

          <button
            onClick={() => this.props.onIncrementhandle(this.props.counter)}
            className="btn btn-primary btn-sm"
          >
            Button1
          </button>
          <button
            className="btn btn-primary btm-danger m-2"
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            Delete
          </button>
        </ul>
      </div>
    );
  }
}

export default Counter;
