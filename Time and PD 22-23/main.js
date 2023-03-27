// Get the current day and time
function updateTime() {
  var now = new Date();
  var day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // Convert the hours to 12 hour format
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var time = hours + ':' + ('0' + minutes).slice(-2) + ' ' + ampm;

  // Find the current period
  var currentPeriod;
  var currentPeriodName;
  var currentPeriodStart;
  var currentPeriodEnd;
  var periods = day === 3 ? SCHEDULE.wednesday : SCHEDULE.otherDays;
  for (var i = 0; i < periods.length; i++) {
    var period = periods[i];
    if (time >= period.start && time < period.end) {
      currentPeriod = i + 1;
      currentPeriodName = period.name;
      currentPeriodStart = period.start;
      currentPeriodEnd = period.end;
      break;
    }
  }

  // Update the schedule widget
  var currentPeriodEl = document.getElementById('current-period');
  var periodNameEl = document.getElementById('period-name');
  var timeRangeEl = document.getElementById('time-range');
  var currentTimeEl = document.getElementById('current-time');
  if (currentPeriod) {
    currentPeriodEl.textContent = 'Period ' + currentPeriod;
    timeRangeEl.textContent = currentPeriodStart + ' - ' + currentPeriodEnd;
  } else {
    currentPeriodEl.textContent = 'No classes currently in session';
    periodNameEl.textContent = '';
    timeRangeEl.textContent = '';
  }
  currentTimeEl.textContent = 'Current time: ' + time;
}

// Run the updateTime at x interval
setInterval(updateTime, 3);
