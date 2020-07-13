import * as React from "react";
import moment from "moment";
import Event from "../../Event";

class Events extends React.Component {
    render() {
        const currentSelectedDay = this.props.selectedDay;
        const events = this.props.selectedEvents;
        const removeEvent = this.props.removeEvent;

        const eventsRendered = events.map((event, i) => {
            return (
                <Event event={ event } onClick={ () => removeEvent(i) }/>
            );
        });

        const dayEventsRendered = [];

        for ( let i = 0; i < eventsRendered.length; i++ ) {
            if ( moment(events[i].date).isSame(currentSelectedDay, "day") ) {
                dayEventsRendered.push(eventsRendered[i]);
            }
        }

        return (
            <div className="day-events mt-8">
                { dayEventsRendered }
            </div>
        );
    }
}

export default Events;