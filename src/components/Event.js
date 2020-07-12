import * as React from "react";

class Event extends React.Component {
  render() {
    return (
      <div
        key={ this.props.event.title }
        className="event-container"
        onClick={ this.props.onClick }
      >
        <div className="event-time event-attr">
          { this.props.event.date.format("HH:mm") }
        </div>

        <div className="event-info">
          <h3 className="event-title event-attr">{ this.props.event.title }</h3>
          <p className="event-desc">{ "" }</p>
        </div>
      </div>
    );
  }
}

export default Event;