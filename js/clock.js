clock();
function clock( ) {
	console.log("Tick");
	var loc = "BC";
    var today = new Date();
    /* Time */
	var h = today.getHours();
    var m = today.getMinutes();
    /* Date */
	var d = today.getDay();
	var day = resolveDay(d);
	var date = today.getDate();
	var suffix = resolveDate();
	var month = today.getMonth();
	var mnth = resolveMonth(month);
	var y = today.getFullYear();

	h = checkHours(h);
	m = checkTime(m);
    document.getElementById(loc).innerHTML =
    "<div class='clock'> <span class='time'>" + h + ":" + m + "</span> <span class='day'>" + day + "</span> <span class='date'>" + date + " " + suffix + " " + mnth + " " + y + "</span></div>";
    var t = setTimeout(clock, 1000);
}
function resolveMonth(i){
	switch(i){
		case(0):
			return "January";
		case(1):
			return "February";
		case(2):
			return "March";
		case(3):
			return "April";
		case(4):
			return "May";
		case(5):
			return "June";
		case(6):
			return "July";
		case(7):
			return "August";
		case(8):
			return "September";
		case(9):
			return "October";
		case(10):
			return "November";
		case(11):
			return "December";
	}
	return "ERR";
}
function resolveDate(i){
	switch(i){
		case(1):
		case(21):
		case(31):
			return "st";
		case(2):
		case(22):
			return "nd";
		case(3):
		case(23):
			return "rd";
		default:
			return "th";
	}
	return "ERR";
}
function resolveDay(i){
	switch(i){
		case(0):
			return "Sunday";
		case(1):
			return "Monday";
		case(2):
			return "Tuesday";
		case(3):
			return "Wednesday";
		case(4):
			return "Thursday";
		case(5):
			return "Friday";
		case(6):
			return "Saturday";
	}
	return "ERR";
}
function checkHours(i){
	if(i == 0){ //12AM instead of 0AM
		i = 12;
	} else if (i > 10){ // add zero in front of numbers < 10
		i = i % 12
	}
    return i;
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
