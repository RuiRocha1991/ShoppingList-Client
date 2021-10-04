import moment from "moment";

export default  (lastUpdate) => {
  const now = moment(new Date());

  if(now.diff(lastUpdate,'days') > 0) {
    return now.diff(lastUpdate,'days') + 'days';
  } else if(now.diff(lastUpdate,'hours') > 0) {
    return now.diff(lastUpdate,'hours') + 'hr';
  } else {
    return now.diff(lastUpdate,'minutes') + 'min'
  }
}