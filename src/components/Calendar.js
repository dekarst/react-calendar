import * as React from 'react';
import moment from "moment";
import Events from './Events';
import Week from './Week';
import WeekDays from './WeekDays';
import events from "./data/Events";
import { Button } from "./chunks/Button";
import AddEventForm from "./AddEventForm";

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedView: "month",
      selectedMonthEvents: [],
      showEvents: false
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);

    this.initialiseEvents();
  }

  previous() {
    this.setState({
      selectedMonth: this.state.selectedMonth.subtract(1, "month")
    });
  }

  next() {
    this.setState({
      selectedMonth: this.state.selectedMonth.add(1, "month")
    });
  }

  select(day) {
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEvents: true
    });
  }

  goToCurrentMonthView() {
    this.setState({
      selectedMonth: moment()
    });
  }

  showCalendar() {
    this.setState({
      selectedMonth: this.state.selectedMonth,
      selectedDay: this.state.selectedDay,
      showEvents: false
    });
  }

  renderMonthLabel() {
    const currentMonthView = this.state.selectedMonth;
    return (
      <span className="box month-label mx-2 font-bold">
        { currentMonthView.format("MMMM YYYY") }
      </span>
    );
  }

  renderDayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="box month-label">
        Events for { currentSelectedDay.format("DD MMMM YYYY") }
      </span>
    );
  }

  renderTodayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="box today-label text-sm font-medium hover:text-red-400 cursor-pointer mx-2"
            onClick={ this.goToCurrentMonthView }>
        Today
      </span>
    );
  }

  renderWeeks() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const monthEvents = this.state.selectedMonthEvents;

    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Monday");
    let count = 0;

    let monthIndex = previousCurrentNextView.month();

    while ( !done ) {
      weeks.push(
        <Week
          previousCurrentNextView={ previousCurrentNextView.clone() }
          currentMonthView={ currentMonthView }
          monthEvents={ monthEvents }
          selected={ currentSelectedDay }
          select={ day => this.select(day) }
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }

  handleAdd() {
    const monthEvents = this.state.selectedMonthEvents;
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
          monthEvents.push(newEvents[i]);
        }

        this.setState({
          selectedMonthEvents: monthEvents
        });
        break;
    }
  }

  addEvent() {
    const currentSelectedDate = this.state.selectedDay;
    this.setState({
      addEvent: true,
    })
    // let isAfterDay = moment().startOf("day").subtract(1, "d");
    //
    // if ( currentSelectedDate.isAfter(isAfterDay) ) {
    //   this.handleAdd();
    // } else {
    //   if ( confirm("Are you sure you want to add an event in the past?") ) { // eslint-disable-line
    //     this.handleAdd();
    //   } else {
    //   }
    // }
  }

  removeEvent(i) {
    const monthEvents = this.state.selectedMonthEvents.slice();
    const currentSelectedDate = this.state.selectedDay;

    if ( confirm("Are you sure you want to remove this event?") ) { // eslint-disable-line
      let index = i;

      if ( index != -1 ) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }

      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  }

  initialiseEvents() {
    const monthEvents = this.state.selectedMonthEvents;

    let allEvents = events;

    for ( let i = 0; i < allEvents.length; i++ ) {
      monthEvents.push(allEvents[i]);
    }

    this.setState({
      selectedMonthEvents: monthEvents
    });
  }

  render() {
    const showEvents = this.state.showEvents;
    const addEvent = this.state.addEvent;

    return (
      <section className="calendar-wrapper">
        <header className="calendar-header mb-6">
          <div className="view-buttons">
            <Button className={ `day-view mx-1 ${ this.state.view === 'day' && 'active' }` } label="Day"/>
            <Button className={ `week-view mx-1 ${ this.state.view === 'week' && 'active' }` } label="Week"/>
            <Button className={ `month-view mx-1 ${ this.state.view === 'month' && 'active' }` } label="Month"/>
          </div>

          { showEvents &&
          <div className="event-header">
            <div className="row title-header">
              { this.renderDayLabel() }
            </div>
            <div className="row button-container">
              <Button className="to-calendar" label="<  Go back" onClick={ this.showCalendar }/>
              <Button className="add-event" label="+  Add Event" onClick={ this.addEvent }/>
            </div>
          </div>
          }

          <div className="row title-header">
            <button className="switch-month previous" onClick={ this.previous }>{ "<" }</button>
            <div className="box header-text">
              { this.renderTodayLabel() }
              { this.renderMonthLabel() }
            </div>
            <button className="switch-month next" onClick={ this.next }>{ ">" }</button>
          </div>

          <WeekDays show={ true }/>
        </header>

        { !showEvents &&
        <div className="days-container">
          { this.renderWeeks() }
        </div>
        }

        { showEvents && this.state.selectedMonthEvents.length > 0 &&
        <Events
          selectedMonth={ this.state.selectedMonth }
          selectedDay={ this.state.selectedDay }
          selectedMonthEvents={ this.state.selectedMonthEvents }
          removeEvent={ i => this.removeEvent(i) }
        />
        }

        { addEvent &&
        <AddEventForm/> }

      </section>
    )
  }
}

export default Calendar;
