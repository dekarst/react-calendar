import * as React from "react";
import moment from "moment";

class WeekDays extends React.Component {
  daysOfWeek = moment.weekdaysShort();

  render() {
    if ( !this.props.show ) {
      return null;
    }

    return (
      <div className="row weekdays-header">
        { this.daysOfWeek.map(day => {
          return (
            <span key={ day } className="box weekday">{ day }</span>
          );
        }) }
      </div>
    );
  }
}

export default WeekDays;