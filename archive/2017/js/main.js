function updateCountdown(a) {
  var b = document.getElementById("clockdiv"),
      c = b.querySelector(".months"),
      d = b.querySelector(".days"),
      e = b.querySelector(".hours"),
      f = b.querySelector(".minutes");e.innerHTML = a.hours, d.innerHTML = a.days, c.innerHTML = a.months, f.innerHTML = a.minutes;
}new WOW({ mobile: !1 }).init();var timerID = countdown(function (a) {
  updateCountdown(a);
}, new Date(Date.parse("2017/07/06 09:00")), countdown.MONTHS | countdown.DAYS | countdown.HOURS | countdown.MINUTES);