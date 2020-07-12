import * as React from "react";
import { Button } from "./chunks/Button";

class AddEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {
        title: '',
        startDate: '',
        endDate: '',
        desc: '',
      },
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let fieldName = event.target.name,
      newValue = event.target.value;

    this.setState(prevState => ({
        event: {...prevState.event, [fieldName]: newValue}
      })
    );
  }

  handleSubmit(event) {
    console.log(event);
    console.log(this.state);
  }

  render() {
    return (
      <form className="add-event-form" onSubmit={ this.handleSubmit }>
        <label htmlFor="event-title">
          <span>Title</span>
          <input type="text" name="title" id="event-title"
                 value={ this.state.event.title } onChange={ this.handleChange }/>
        </label>
        <label htmlFor="event-start-date">
          <span>Start Date</span>
          <input type="datetime-local" name="startDate" id="event-start-date"
                 value={ this.state.event.startDate } onChange={ this.handleChange }/>
        </label>
        <label htmlFor="event-end-date">
          <span>End Date</span>
          <input type="datetime-local" name="endDate" id="event-end-date"
                 value={ this.state.event.endDate } onChange={ this.handleChange }/>
        </label>
        <label htmlFor="event-desc">
          <span>Description</span>
          <textarea name="desc" id="event-desc"
                    onChange={ this.handleChange }>{ this.state.event.desc }</textarea>
        </label>

        <Button type="submit" className="submit" label="Add Event"/>
      </form>
    );
  }
}

export default AddEventForm;