var starts, myTimer, result;
var stopedTime = 0;

document.getElementById('btn-start').addEventListener("click", start);


function runTime() {
	var currentTime = new Date();
	result = currentTime - starts;
	showTime();
}

function showTime () {
	var time = result + stopedTime;
	displ.innerHTML = convertTime(time);
}

function start() {
	starts = new Date();
	myTimer = setInterval(runTime, 10);

	document.getElementById('btn-start').removeEventListener("click", start);
	changeToStop();
	document.getElementById('btn-stop').addEventListener("click", stop);
	document.getElementById('btn-split').addEventListener("click", split);
	document.getElementById('btn-reset').addEventListener("click", reset);  
};

function stop() {
	clearInterval(myTimer);
	stopedTime += result;
	var stop = document.createElement('p');
	stop.innerHTML = 'Stop: ' + convertTime(result);
	resultList.appendChild(stop);
	delListener();
	changeToStart();
	document.getElementById('btn-start').addEventListener("click", resume);
};

function delListener() {
	document.getElementById('btn-stop').removeEventListener("click", stop);
	document.getElementById('btn-split').removeEventListener("click", split);
};

function changeToStart() {
	document.getElementById('btn-stop').id = 'btn-start';
	document.getElementById('btn-start').innerHTML = 'Start';	
} 

function changeToStop() {
	document.getElementById('btn-start').id = 'btn-stop';
	document.getElementById('btn-stop').innerHTML = 'Stop';	
} 

function resume() {
	starts = new Date();
	myTimer = setInterval(runTime, 10);

	document.getElementById('btn-start').removeEventListener("click", resume);
	document.getElementById('btn-split').addEventListener("click", split);
	changeToStop();
	document.getElementById('btn-stop').addEventListener("click", stop);
};

function split() {
	var split = document.createElement('p');
	split.innerHTML = 'Split: ' + convertTime(result);
	resultList.appendChild(split);
};

function reset() {
	clearInterval(myTimer);
	txt = "00 : 00 : 00 . 000";
	displ.innerHTML = txt;
	resultList.innerHTML = '';
	starts = 0;
	result = 0;
	stopedTime = 0;
	if(document.getElementById('btn-stop')){
		document.getElementById('btn-stop').removeEventListener("click", stop);
		changeToStart();
	}
	document.getElementById('btn-split').removeEventListener("click", split);
	document.getElementById('btn-reset').removeEventListener("click", reset);  
	document.getElementById('btn-start').removeEventListener("click", resume);
	document.getElementById('btn-start').addEventListener("click", start);
};

function convertTime(time) {
	var milliseconds = time % 1000;
	if(milliseconds < 10) {
		milliseconds = '00' + milliseconds;
	} else if(milliseconds < 100) {
		milliseconds = '0' + milliseconds;
	}
	var seconds = parseInt(time / 1000) % 60;
	if(seconds < 10) seconds = '0' + seconds;
	var minutes = parseInt( time / 1000 / 60)  % 60;
	if(minutes < 10) minutes = '0' + minutes;
	var hours = parseInt( time / 1000 / 60 / 60)  % 24;
	if(hours < 10) hours = '0' + hours;
	return (hours + " : " + minutes + " : " + seconds + " . " + milliseconds);
}