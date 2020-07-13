import * as React from "react";
import moment from "moment";

class Day extends React.Component {
    getHoursInDay() {
        let items = [];

        new Array(24).fill().forEach((el, index) => {
            items.push(moment({hour: index}).format('h:mm A'));
            // items.push(moment({hour: index, minute: 30}).format('h:mm A'));
        });

        return items;
    }

    renderDayHourlyEvent(hour) {
        return this.props.events.map(event => {
            let date = moment(event.date),
                currentDate = moment(this.props.selectedDay);

            console.log(date)
            console.log(currentDate)

            return (
                date.format('MMMM Do YYYY') === currentDate.format('MMMM Do YYYY') && date.format('MMMM Do YYYY h:mm A').includes(hour) ?
                    <span className="event"><span>{ event.title }</span></span> : null
            )
        })
    }

    render() {
        return (
            <div className='day-view-container'>
                <ul>
                    { this.getHoursInDay().map(hour => {
                        return <li className='day-view-day-container'>
                            <span className="hour">{ hour }</span>
                            <span className="events">{ this.renderDayHourlyEvent(hour) }</span>
                        </li>
                    }) }
                </ul>
            </div>
        );
    }
}

export default Day;