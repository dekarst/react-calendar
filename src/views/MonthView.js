import * as React from "react";
import moment from "moment";
import Week from "../components/Week";
import events from "../components/data/Events";
import Events from "../components/Events";
import WeekDays from "../components/WeekDays";

class MonthView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [],
      showEvents: false
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
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
      <span className="box month-label">
        { currentMonthView.format("MMMM YYYY") }
      </span>
    );
  }

  renderDayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="box month-label">
        { currentSelectedDay.format("DD MMMM YYYY") }
      </span>
    );
  }

  renderTodayLabel() {
    return (
      <span className="box today-label" onClick={ this.goToCurrentMonthView }>
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
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const showEvents = this.state.showEvents;

    switch ( this.state.selectedView ) {
      case "month" :
        break;
      case "week":
        break;
      case "day":
        break;
      default:
        break;
    }

    return (
      <section className="main-calendar">
        <header className="calendar-header">

          <div className="view-buttons">
            <button className="month-view">Month</button>
            <button className="week-view">Week</button>
            <button className="day-view">Day</button>
          </div>

          <div className="row title-header">
            { this.renderDayLabel() }
          </div>

          <div className="row button-container">
            <button className="box arrow fa fa-angle-left" onClick={ this.showCalendar }>{ "<" }</button>
            <button className="box event-button fa fa-plus-square" onClick={ this.addEvent }>{ "+" }</button>
          </div>

        </header>

        <Events
          selectedMonth={ this.state.selectedMonth }
          selectedDay={ this.state.selectedDay }
          selectedMonthEvents={ this.state.selectedMonthEvents }
          removeEvent={ i => this.removeEvent(i) }
        />

      </section>
    );

    if ( showEvents ) {
      return (
        <section className="main-calendar">
          <header className="calendar-header">

            <div className="view-buttons">
              <button className="month-view">Month</button>
              <button className="week-view">Week</button>
              <button className="day-view">Day</button>
            </div>

            <div className="row title-header">
              { this.renderDayLabel() }
            </div>

            <div className="row button-container">
              <button className="box arrow fa fa-angle-left" onClick={ this.showCalendar }>{ "<" }</button>
              <button className="box event-button fa fa-plus-square" onClick={ this.addEvent }>{ "+" }</button>
            </div>

          </header>

          <Events
            selectedMonth={ this.state.selectedMonth }
            selectedDay={ this.state.selectedDay }
            selectedMonthEvents={ this.state.selectedMonthEvents }
            removeEvent={ i => this.removeEvent(i) }
          />

        </section>
      );
    } else {
      return (
        <section className="main-calendar">
          <header className="calendar-header">

            <div className="view-buttons">
              <button className="month-view">Month</button>
              <button className="week-view">Week</button>
              <button className="day-view">Day</button>
            </div>

            <div className="row title-header">
              <button className="box arrow previous" onClick={ this.previous }>{ "<" }</button>

              <div className="box header-text">
                { this.renderTodayLabel() }
                { this.renderMonthLabel() }
              </div>

              <button className="box arrow next" onClick={ this.next }>{ ">" }</button>
            </div>

            <WeekDays/>

          </header>
          <div className="days-container">
            { this.renderWeeks() }
          </div>
        </section>
      );
    }
  }
}

export default MonthView;