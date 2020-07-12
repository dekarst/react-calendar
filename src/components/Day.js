import * as React from "react";

class Day extends React.Component {
  render() {
    let day = this.props.day;

    return (
      <div className={
        "day" +
        (day.isToday ? " today" : "") +
        (day.isCurrentMonth ? "" : " different-month") +
        (day.date.isSame(this.props.selected) ? " selected" : "") +
        (day.hasEvents ? " has-events" : "")
      }
           onClick={ () => this.props.select(day) }
      >
        <div className="day-number">{ day.number }</div>
      </div>
    );
  }
}

export default Day;