import moment from "moment";

class Storage {
    constructor() {
        this.events = [
            {
                title: "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
                date: moment().startOf("day").add(15, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "holiday"
            },
            {
                title: "Event 2 - Meeting",
                date: moment().startOf("day").subtract(2, "d").add(2, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "meeting"
            },
            {
                title: "Event 3 - Cinema",
                date: moment().startOf("day").subtract(7, "d").add(18, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "hangout"
            },
            {
                title: "Event 4 - Theater",
                date: moment().startOf("day").subtract(16, "d").add(20, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "hangout"
            },
            {
                title: "Event 5 - Drinks",
                date: moment().startOf("day").subtract(2, "d").add(12, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "hangout"
            },
            {
                title: "Event 6 - Diving",
                date: moment().startOf("day").subtract(2, "d").add(13, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "hangout"
            },
            {
                title: "Event 7 - Tennis",
                date: moment().startOf("day").subtract(2, "d").add(14, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "hangout"
            },
            {
                title: "Event 8 - Swimmming",
                date: moment().startOf("day").subtract(2, "d").add(17, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "hangout"
            },
            {
                title: "Event 9 - Chilling",
                date: moment().startOf("day").subtract(2, "d").add(16, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "hangout"
            },
            {
                title: "Hello World",
                date: moment().startOf("day").add(17, "h"),
                desc: "Lorem ipsum dolor sit, amet consectetur...",
                type: "meeting"
            }
        ];

        localStorage.getItem("events") === null && this.setEvents(this.events);
    }

    setEvents(events) {
        localStorage.setItem("events", JSON.stringify(events));
    }

    getEvents() {
        return JSON.parse(localStorage.getItem("events"));
    }
}

export default Storage;