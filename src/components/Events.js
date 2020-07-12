import * as React from "react";
import Event from "./Event";

class Events extends React.Component {
  render() {
    const currentMonthView = this.props.selectedMonth;
    const currentSelectedDay = this.props.selectedDay;
    const monthEvents = this.props.selectedMonthEvents;
    const removeEvent = this.props.removeEvent;

    const monthEventsRendered = monthEvents.map((event, i) => {
      return (
        <Event event={event} onClick={ () => removeEvent(i) }/>
      );
    });

    const dayEventsRendered = [];

    for ( let i = 0; i < monthEventsRendered.length; i++ ) {
      if ( monthEvents[i].date.isSame(currentSelectedDay, "day") ) {
        dayEventsRendered.push(monthEventsRendered[i]);
      }
    }

    return (
      <div className="day-events">
        { dayEventsRendered }
      </div>
    );
  }
}

export default Events;