import * as React from "react";
import Storage from "../data/Storage";
import { Button } from "../chunks/Button";

class AddEventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {
                title: '',
                date: '',
                desc: '',
                type: '',
            },
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    serialize(form) {
        let serialized = {};

        for ( let i = 0; i < form.elements.length; i++ ) {
            let field = form.elements[i];

            if ( !field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button' ) continue;

            if ( field.type === 'select-multiple' ) {
                for ( let n = 0; n < field.options.length; n++ ) {
                    if ( !field.options[n].selected ) continue;
                    serialized[field.name] = field.options[n].value;
                }

            } else if ( (field.type !== 'checkbox' && field.type !== 'radio') || field.checked ) {
                serialized[field.name] = field.value;
            }
        }

        return serialized;
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
        event.preventDefault();

        const currentEventData = this.serialize(event.target);
        const eventStorage = new Storage();

        eventStorage.setEvents([...eventStorage.getEvents(), currentEventData]);

        alert(`You have successfully created a new Event: ${ currentEventData.title }`);
        this.props.closeForm();
    }

    render() {
        return (
            <div className="form-wrapper">
                <form className="add-event-form" onSubmit={ this.handleSubmit }>
                    <div className="form-header flex justify-between items-center pt-2 mb-8">
                        <h3 className="form-title font-bold text-2xl">Add New Event</h3>
                        <Button onClick={ this.props.closeForm } label="Close"/>
                    </div>
                    <div className="form-fields">
                        <label htmlFor="event-title">
                            <span>Title</span>
                            <input type="text" name="title" id="event-title"
                                   value={ this.state.event.title } onChange={ this.handleChange }/>
                        </label>
                        <label htmlFor="event-date">
                            <span>Date</span>
                            <input type="datetime-local" name="date" id="event-date" value={ this.state.event.date }
                                   onChange={ this.handleChange }/>
                        </label>
                        {/*<label htmlFor="event-start-date">*/ }
                        {/*  <span>Start Date</span>*/ }
                        {/*  <input type="datetime-local" name="startDate" id="event-start-date"*/ }
                        {/*         value={ this.state.event.startDate } onChange={ this.handleChange }/>*/ }
                        {/*</label>*/ }
                        {/*<label htmlFor="event-end-date">*/ }
                        {/*  <span>End Date</span>*/ }
                        {/*  <input type="datetime-local" name="endDate" id="event-end-date"*/ }
                        {/*         value={ this.state.event.endDate } onChange={ this.handleChange }/>*/ }
                        {/*</label>*/ }
                        <label htmlFor="event-desc">
                            <span>Description</span>
                            <textarea name="desc" id="event-desc"
                                      onChange={ this.handleChange }>{ this.state.event.desc }</textarea>
                        </label>
                        <label htmlFor="event-type">
                            <span>Type</span>
                            <select name="type" id="event-type" value={ this.state.event.type }
                                    onChange={ this.handleChange }>
                                <option value="holiday">Holiday</option>
                                <option value="hangout">Hangout</option>
                                <option value="meeting">Meeting</option>
                                <option value="birthday">Birthday</option>
                            </select>
                        </label>
                        <Button type="submit" className="submit" label="Add Event"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddEventForm;