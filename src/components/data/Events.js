import moment from "moment";

const events = [
  {
    title:
      "Press the Add button and enter a name for your event. P.S you can delete me by pressing me!",
    date: moment(),
    dynamic: false
  },
  {
    title: "Event 2 - Meeting",
    date: moment().startOf("day").subtract(2, "d").add(2, "h"),
    dynamic: false
  },
  {
    title: "Event 3 - Cinema",
    date: moment().startOf("day").subtract(7, "d").add(18, "h"),
    dynamic: false
  },
  {
    title: "Event 4 - Theater",
    date: moment().startOf("day").subtract(16, "d").add(20, "h"),
    dynamic: false
  },
  {
    title: "Event 5 - Drinks",
    date: moment().startOf("day").subtract(2, "d").add(12, "h"),
    dynamic: false
  },
  {
    title: "Event 6 - Diving",
    date: moment().startOf("day").subtract(2, "d").add(13, "h"),
    dynamic: false
  },
  {
    title: "Event 7 - Tennis",
    date: moment().startOf("day").subtract(2, "d").add(14, "h"),
    dynamic: false
  },
  {
    title: "Event 8 - Swimmming",
    date: moment().startOf("day").subtract(2, "d").add(17, "h"),
    dynamic: false
  },
  {
    title: "Event 9 - Chilling",
    date: moment().startOf("day").subtract(2, "d").add(16, "h"),
    dynamic: false
  },
  {
    title: "Hello World",
    date: moment().startOf("day").add(5, "h"),
    dynamic: false
  }
];

export default events;