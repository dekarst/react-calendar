import * as React from "react";
import WeekDay from "./WeekDay";
import moment from "moment";

class Week extends React.Component {
    render() {
        let
            days = [],
            date = moment(this.props.previousCurrentNextDate),
            events = this.props.events;

        for ( let i = 0; i < 7; i++ ) {
            let dayHasEvents = false;

            for ( let j = 0; j < events.length; j++ ) {
                if ( moment(events[j].date).isSame(date, "day") ) {
                    dayHasEvents = true;
                }
            }

            let day = {
                name: date.format("dd").substring(0, 1),
                number: date.date(),
                isCurrentMonth: date.month() === this.props.currentMonth.month(),
                isToday: date.isSame(new Date(), "day"),
                date: date,
                hasEvents: dayHasEvents
            };

            days.push(<WeekDay events={ events } key={ day.date } day={ day }
                               selected={ this.props.selected } select={ this.props.select }/>);
            date = date.clone();
            date.add(1, "d");
        }

        return (
            <div className="row week">
                {/*{ days }*/}
            </div>
        );
    }
}

export default Week;
