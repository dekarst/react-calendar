import * as React from "react";

class WeekDay extends React.Component {
    constructor(props) {
        super(props);
    }

    // renderWeekDay() {
    //     return this.props.events.map(event => {
    //         return <span>{
    //             event.date.format('MMMM Do YYYY') === this.props.selectedDay.format('MMMM Do YYYY') ?
    //                 event.title : null
    //         }</span>
    //     })
    // }

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
                { day.hasEvents ? <span></span> : null }
            </div>
        );
    }
}

export default WeekDay;