import * as moment from 'moment';

const CONFERENCE_DATE = new moment('2020-07-20 09:00');

function updateTimer() {
    var now = moment();
    var diff = moment.duration(CONFERENCE_DATE.diff(now));
    var month_span = document.querySelector('span.months');
    month_span.innerHTML = diff.months();
    var days_span = document.querySelector('span.days');
    days_span.innerHTML = diff.days();
    var hours_span = document.querySelector('span.hours');
    hours_span.innerHTML = diff.hours();
    var minutes_span = document.querySelector('span.minutes');
    minutes_span.innerHTML = diff.minutes();
}

document.onload = function () {
    updateTimer();
    var timer = setInterval(updateTimer, 60000);
}();
