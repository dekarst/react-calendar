import * as React from "react";
import moment from "moment";
import { Button } from "../chunks/Button";

class Event extends React.Component {
    render() {
        return (
            <div
                key={ this.props.event.title }
                className="event-container"
                onClick={ this.props.onClick }
            >
                <div className="event-time event-attr">
                    { moment(this.props.event.date).format("HH:mm:A") }
                </div>

                <div className="event-info">
                    <h3 className="event-title event-attr">{ this.props.event.title }</h3>
                    <p className="event-desc">{ this.props.event.desc }</p>
                </div>
                <div className="event-actions">
                    <Button className="action-btn edit" label="Edit" onClick={ this.props.onEdit }/>
                    <Button className="action-btn remove" label="X" onClick={ this.props.onRemove }/>
                </div>
            </div>
        );
    }
}

export default Event;