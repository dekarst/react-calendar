import * as React from "react";
import Day from "./Day";

class Week extends React.Component {
  render() {
    let
      days = [],
      date = this.props.previousCurrentNextView,
      monthEvents = this.props.monthEvents;

    for ( let i = 0; i < 7; i++ ) {
      let dayHasEvents = false;

      for ( let j = 0; j < monthEvents.length; j++ ) {
        if ( monthEvents[j].date.isSame(date, "day") ) {
          dayHasEvents = true;
        }
      }

      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === this.props.currentMonthView.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date,
        hasEvents: dayHasEvents
      };

      days.push(<Day key={ day.date } day={ day } selected={ this.props.selected } select={ this.props.select }/>);
      date = date.clone();
      date.add(1, "d");
    }

    return (
      <div className="row week">
        { days }
      </div>
    );
  }
}

export default Week;
