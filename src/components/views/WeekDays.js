import * as React from "react";
import moment from "moment";

class WeekDays extends React.Component {
    daysOfWeek = moment.weekdaysShort();
    formattedDays = this.daysOfWeek.push(this.daysOfWeek.shift());

    render() {
        if ( !this.props.showWeekDays && !this.props.showWeekDayNumber ) {
            return (
                <div className="row weekdays-header">
                    { this.daysOfWeek.map(day => {
                        return (
                            <span key={ day } className="box weekday">{ day }</span>
                        );
                    }) }
                </div>
            );
        } else if ( this.props.showWeekDayNumber ) {
            return (
                <div className="row weekdays-header">
                    { this.daysOfWeek.map(day => {
                        return (
                            <span key={ day }
                                  className="box weekday">{ day } { this.props.currentWeek.format('D') }</span>
                        );
                    }) }
                </div>
            )
        } else {
            return (
                <span className="box weekday">{ this.props.currentDay }</span>
            )
        }
    }
}

export default WeekDays;