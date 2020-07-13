import * as React from 'react';
import moment from "moment";
import Storage from "./data/Storage";
import MonthWeek from './views/month/Week';
import Events from './views/month/Events';
import Week from './views/week/Week';
import Day from './views/day/Day';
import WeekDays from './views/WeekDays';
import AddEventForm from "./forms/AddEventForm";
import EditEventForm from "./forms/EditEventForm";
import { Button } from "./chunks/Button";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: moment(),
            selectedWeek: moment().startOf("week"),
            selectedDay: moment().startOf("day"),
            selectedView: "month",
            selectedEvents: [],
            showEvents: false,
            editingEventData: {},
            calendarState: 'months',
            renderCalendarState: {
                'days': this.renderDayView.bind(this),
                'weeks': this.renderWeekView.bind(this),
                'months': this.renderMonthView.bind(this)
            }
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.showCalendar = this.showCalendar.bind(this);
        this.goToCurrentDateView = this.goToCurrentDateView.bind(this);
        this.initialiseEvents();
    }

    previous() {
        switch ( this.state.calendarState ) {
            case "days" :
                this.setState({
                    selectedDay: this.state.selectedDay.subtract(1, "day"),
                    selectedWeek: this.state.selectedWeek.subtract(1, "day"),
                    selectedMonth: this.state.selectedMonth.subtract(1, "day"),
                });
                break;
            case "weeks" :
                this.setState({
                    selectedDay: this.state.selectedDay.subtract(1, "week"),
                    selectedWeek: this.state.selectedWeek.subtract(1, "week"),
                    selectedMonth: this.state.selectedMonth.subtract(1, "week"),
                });
                break;
            default :
                this.setState({
                    selectedDay: this.state.selectedDay.subtract(1, "month"),
                    selectedWeek: this.state.selectedWeek.subtract(1, "month"),
                    selectedMonth: this.state.selectedMonth.subtract(1, "month"),
                });
                break;
        }

    }

    next() {
        switch ( this.state.calendarState ) {
            case "days" :
                this.setState({
                    selectedDay: this.state.selectedDay.add(1, "day"),
                    selectedWeek: this.state.selectedWeek.add(1, "day"),
                    selectedMonth: this.state.selectedMonth.add(1, "day"),
                });
                break;
            case "weeks" :
                this.setState({
                    selectedDay: this.state.selectedDay.add(1, "week"),
                    selectedWeek: this.state.selectedWeek.add(1, "week"),
                    selectedMonth: this.state.selectedMonth.add(1, "week"),
                });
                break;
            default :
                this.setState({
                    selectedDay: this.state.selectedDay.add(1, "month"),
                    selectedWeek: this.state.selectedWeek.add(1, "month"),
                    selectedMonth: this.state.selectedMonth.add(1, "month"),
                });
                break;
        }
    }

    select(day) {
        this.setState({
            selectedMonth: day.date,
            selectedDay: day.date.clone(),
            showEvents: true
        });
    }

    goToCurrentDateView() {
        this.setState({
            selectedMonth: moment(),
            selectedWeek: moment().startOf('week'),
            selectedDay: moment().startOf('day'),
            showEvents: false,
        });
    }

    showCalendar() {
        this.setState({
            selectedMonth: this.state.selectedMonth,
            selectedWeek: this.state.selectedWeek,
            selectedDay: this.state.selectedDay,
            showEvents: false
        });
    }

    renderEventDayLabel() {
        const currentSelectedDay = this.state.selectedDay;
        return (
            <span className="box month-label">
        Events for { currentSelectedDay.format("DD MMMM YYYY") }
      </span>
        );
    }

    renderMonthLabel() {
        return (
            <span className="box month-label mx-2 font-bold">
                {
                    this.state.calendarState === 'days'
                        ? this.state.selectedDay.format("D MMMM YYYY")
                        : this.state.selectedMonth.format("MMMM YYYY")
                }
      </span>
        );
    }

    renderTodayLabel() {
        return (
            <button className="today-label" onClick={ this.goToCurrentDateView }>Today</button>
        );
    }

    onRenderDayView() {
        this.setState({
            calendarState: 'days'
        });
    }

    renderDayView() {
        return <Day selectedDay={ this.state.selectedDay } events={ this.state.selectedEvents }/>
    }

    onRenderWeekView() {
        this.setState({
            calendarState: 'weeks'
        });
    }

    renderWeekView() {
        const currentMonth = this.state.selectedMonth;
        const currentSelectedDay = this.state.selectedDay;
        const events = this.state.selectedEvents;

        let weeks = [];
        let done = false;
        let previousCurrentNextDate = currentMonth
            .clone()
            .startOf("month")
            .subtract(1, "d")
            .day("Monday");
        let count = 0;

        let monthIndex = previousCurrentNextDate.month();

        while ( !done ) {
            weeks.push(
                <Week
                    previousCurrentNextDate={ previousCurrentNextDate.clone() }
                    currentMonth={ currentMonth }
                    events={ events }
                    selected={ currentSelectedDay }
                    selectedDay={ this.state.selectedDay }
                    select={ day => this.select(day) }
                />
            );
            previousCurrentNextDate.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextDate.month();
            monthIndex = previousCurrentNextDate.month();
        }
        return weeks;
    }

    onRenderMonthView() {
        this.setState({
            calendarState: 'months'
        });
    }

    renderMonthView() {
        const currentMonth = this.state.selectedMonth;
        const currentSelectedDay = this.state.selectedDay;
        const events = this.state.selectedEvents;

        let weeks = [];
        let done = false;
        let previousCurrentNextDate = currentMonth
            .clone()
            .startOf("month")
            .subtract(1, "d")
            .day("Monday");
        let count = 0;

        let monthIndex = previousCurrentNextDate.month();

        while ( !done ) {
            weeks.push(
                <MonthWeek
                    previousCurrentNextDate={ previousCurrentNextDate.clone() }
                    currentMonth={ currentMonth }
                    events={ events }
                    selected={ currentSelectedDay }
                    select={ day => this.select(day) }
                />
            );
            previousCurrentNextDate.add(1, "w");
            done = count++ > 2 && monthIndex !== previousCurrentNextDate.month();
            monthIndex = previousCurrentNextDate.month();
        }
        return weeks;
    }

    handleAdd() {
        const events = this.state.selectedEvents;
        const currentSelectedDate = this.state.selectedDay;

        let newEvents = [];
        let eventTitle = prompt("Please enter a name for your event: ");

        switch ( eventTitle ) {
            case "":
                alert("Event name cannot be empty.");
                break;
            case null:
                alert("Changed your mind? You can add one later!");
                break;
            default:
                let newEvent = {
                    title: eventTitle,
                    date: currentSelectedDate,
                    dynamic: true
                };

                newEvents.push(newEvent);

                for ( let i = 0; i < newEvents.length; i++ ) {
                    events.push(newEvents[i]);
                }

                this.setState({
                    selectedEvents: events
                });
                break;
        }
    }

    addEvent() {
        this.setState({
            addingEvent: true,
        })
    }

    closeAddEvent() {
        this.setState({
            addingEvent: false,
        })
    }

    removeEvent(i) {
        const events = this.state.selectedEvents.slice();

        if ( confirm("Are you sure you want to remove this event?") ) { // eslint-disable-line
            let index = i;

            if ( index !== -1 ) {
                events.splice(index, 1);
            }

            this.setState({
                selectedEvents: events
            });
        }
    }

    editEvent(i) {
        const events = this.state.selectedEvents.slice();

        this.setState({
            editingEvent: true,
            editingEventData: events.splice(i, 1)[0],
        });
    }

    closeEditEvent() {
        this.setState({
            editingEvent: false,
        })
    }

    initialiseEvents() {
        const events = this.state.selectedEvents;

        let allEvents = new Storage().getEvents();

        for ( let i = 0; i < allEvents.length; i++ ) {
            events.push(allEvents[i]);
        }

        this.setState({
            selectedEvents: events
        });
    }

    render() {
        const showEvents = this.state.showEvents;
        const addingEvent = this.state.addingEvent;
        const editingEvent = this.state.editingEvent;

        return (
            <section className="calendar-wrapper">
                <header className="calendar-header">


                    <div className="header-button-group">
                        { !showEvents &&
                        <div className="view-buttons">
                            <Button onClick={ this.onRenderDayView.bind(this) }
                                    className={ `day-view mx-1 ${ this.state.view === 'day' && 'active' }` }
                                    label="Day"/>
                            <Button onClick={ this.onRenderWeekView.bind(this) }
                                    className={ `week-view mx-1 ${ this.state.view === 'week' && 'active' }` }
                                    label="Week"/>
                            <Button onClick={ this.onRenderMonthView.bind(this) }
                                    className={ `month-view mx-1 ${ this.state.view === 'month' && 'active' }` }
                                    label="Month"/>
                        </div>
                        }
                        <Button className="add-event" label="+  Add Event" onClick={ this.addEvent }/>
                    </div>

                    { showEvents &&
                    <div className="event-header">
                        <div className="row title-header">
                            { this.renderEventDayLabel() }
                        </div>
                        <div className="row button-container">
                            <Button className="to-calendar" label="<  Go back" onClick={ this.showCalendar }/>
                        </div>
                    </div>
                    }

                    <div className="row title-header">
                        <button className="btn arrow previous" onClick={ this.previous }>{ "<" }</button>
                        <div className="box header-text">
                            { this.renderTodayLabel() }
                            { this.renderMonthLabel() }
                        </div>
                        <button className="btn arrow next" onClick={ this.next }>{ ">" }</button>
                    </div>

                    <WeekDays currentMonth={ this.state.selectedMonth } currentWeek={ this.state.selectedWeek }
                              showWeekDayNumber={ this.state.calendarState === 'weeks' }
                              showWeekDays={ this.state.calendarState === 'days' }
                              currentDay={ this.state.selectedDay.format("dddd") }/>
                </header>

                { !showEvents &&
                <div className="days-container">
                    { this.state.renderCalendarState[this.state.calendarState]() }
                </div>
                }

                { showEvents && this.state.selectedEvents.length > 0 &&
                <Events
                    selectedMonth={ this.state.selectedMonth }
                    selectedDay={ this.state.selectedDay }
                    selectedEvents={ this.state.selectedEvents }
                    removeEvent={ i => this.removeEvent(i) }
                    editEvent={ i => this.editEvent(i) }
                />
                }

                { addingEvent && (
                    <AddEventForm closeForm={ this.closeAddEvent.bind(this) }/>
                ) }

                { editingEvent && (
                    <EditEventForm closeForm={ this.closeEditEvent.bind(this) } event={ this.state.editingEventData }/>
                ) }

            </section>
        )
    }
}

export default Calendar;
