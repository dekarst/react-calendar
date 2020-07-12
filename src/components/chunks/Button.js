import * as React from "react";

export class Button extends React.Component {
  render() {
    return (
      <button
        className={ `btn btn-default ${ this.props.className }` }
        type={this.props.type}
        onClick={ this.props.onClick }>
        { this.props.label }
      </button>
    );
  }
}