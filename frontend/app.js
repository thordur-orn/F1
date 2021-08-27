//const { type } = require("os");

var tableString = '';
var baseUrl = 'http://localhost:3000/api/v1';

function getAllDrivers(){
    //The URL to which we will send the request
    var url = baseUrl + '/drivers';

    axios.get(url, {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(function (response) {
            printDrivers(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {});
}

function getStandingsByYear(){
    //The URL to which we will send the request
    var year = document.getElementById("year").value;
    var url = baseUrl + '/standings/' + year;

    axios.get(url, {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(function (response) {
            printStandings(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {});
}

function getConstructorStandingsByYear(){
    var year = document.getElementById("year").value;
    var url = baseUrl + '/constructorStandings/' + year;

    axios.get(url, {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(function(response) {
            printConstructorStandings(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
        .then(function(){});
}

function getResultsByYear(){
    var year = document.getElementById("year").value;
    var url = baseUrl + '/results/' + year;

    axios.get(url, {mode: 'cors', 'Cache-Control': 'no-cache'})
        .then(function (response) {
            printResults(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
        .then(function(){});
}

///todo : constructor championship

function singleRaceResults(data, round){
    retObj = {name: "", circuit: "", date: "", round: "", location: "", country: "", results: []};

    for(d of data){
        
        if(d.round == round){
            var pos = d.position;
            if(pos == null){
                pos = 'DNF';
            }
            retObj.name = d.racename;
            retObj.date = d.date;
            retObj.round = d.round;
            retObj.circuit = d.circuit;
            retObj.location = d.location;
            retObj.country = d.country;
            retObj["results"].push({driver: d.driver, position: pos, status: d.status, timems: d.timems, laps: d.laps, points: d.points, grid: d.grid, constructor: d.team});
        }
    }

    return retObj;
}


function printDrivers(data){
    let tableArea = document.getElementById('tableArea');
    let tableString = "<table><tr><th>Name</th><th>Nationality</th><th>Number</th></tr>"
    
    for(i = 0; i < 100; i++){
        tableString += "<tr>";
        tableString += "<td><a href=\"" + data[i].url + "\">" + data[i].forename + ' ' + data[i].surname + "</a></td>";
        tableString += "<td>" + data[i].nationality + "</td><td>" + data[i].number + "</td>";
        tableString += "</tr>";
    }
    
    tableString += '</table>';
    
    tableArea.innerHTML = tableString;
}

// less obsolete data received, but takes longer to execute.
// replace /results/ with /raceIds/ in getResultsByYear() 
// and printResults with printResults_2 to use.
function printResults_2(data){
    tableString += "<h1 class=\"whiteFont marginLeft10px\">Results by round</h1>";
    for(d of data){
        //console.log(d.results[0]);
        tableString += "<button type=\"button\" class=\"collapsible blackColor whiteFont result\"\"><div class=\"marginLeft10px round\">Round " +
        d.round + "</div><div class=\"racename marginLeft10px\">" + d.name + "</div><div class=\"marginLeft10px\", \"circuit\">" +
        d.circuit + ", " + d.location + ", " + d.country + "</div><div class=\"marginLeft10px\", \"raceDate\">" 
        + parseDate(d.date) + "</div></button>";
        tableString += "<div class=\"content greyColor whiteFont\"><table><tr><th>Pos.</th><th>Driver</th><th>Constructor</th><th>Grid</th><th>Time</th><th>Status</th><th>Laps</th><th>Points</th></tr>";
        
        for(let r of d.result){
            tableString += "<tr><td>" + r.position + "</td><td>" + r.driver + "</td><td>" +
            r.team + "</td><td>" + r.grid + "</td><td>" + msToTime(r.timems) + 
            "</td><td>" + r.status + "</td><td>" + r.laps + "</td><td>" + r.points + "</td></tr>";
        }

        tableString += "</table></div>";
        tableArea.innerHTML = tableString;
        makeCollapsible();
    }
}

function printResults(data){
    let resultsArr = new Array();
    let rounds = 0;

    for(d of data){
        if(d.round > rounds){
            rounds = d.round;
        }
    }

    for(i = 1; i < rounds + 1; i++){
        resultsArr.push(singleRaceResults(data, i));
    }

    let tableArea = document.getElementById('tableArea');
    tableString += "<h1 class=\"whiteFont marginLeft10px\">Results by round</h1>";

    for(d of resultsArr){
        tableString += "<button type=\"button\" class=\"collapsible blackColor whiteFont result\"\"><div class=\"marginLeft10px round\">Round " +
        d.round + "</div><div class=\"racename marginLeft10px\">" + d.name + "</div><div class=\"marginLeft10px\", \"circuit\">" +
        d.circuit + ", " + d.location + ", " + d.country + "</div><div class=\"marginLeft10px\", \"raceDate\">" 
        + parseDate(d.date) + "</div></button>";
        tableString += "<div class=\"content greyColor whiteFont\"><table><tr><th>Pos.</th><th>Driver</th><th>Constructor</th><th>Grid</th><th>Time</th><th>Status</th><th>Laps</th><th>Points</th></tr>";

        for(r of d.results){
            tableString += "<tr><td>" + r.position + "</td><td>" + r.driver + "</td><td>" +
            r.constructor + "</td><td>" + r.grid + "</td><td>" + msToTime(r.timems) + 
            "</td><td>" + r.status + "</td><td>" + r.laps + "</td><td>" + r.points + "</td></tr>";
        }

        tableString += "</table></div>";
        tableArea.innerHTML = tableString;
        makeCollapsible();
    }
}

function printStandings(data){
    tableString = "<h1 class=\"whiteFont marginLeft10px\">Championship Standings</h1><button type=\"button\" class=\"collapsible blackColor whiteFont standings\"><div class=\"marginLeft10px\"><h1>World Drivers' Championship Standings</h1></div></button>";
    tableString += "<div class=\"content greyColor whiteFont\"><table><tr><th>Pos.</th><th>Driver</th><th>Points</th><th>Constructor</th><th>Wins</th></tr>";
    let pos = 1;

    for(d of data){
        tableString += "<tr><td>" + pos++ + "</td><td>" + d.driver + "</td><td>" + d.points + "</td><td>" + d.team + "</td><td>" + d.wins +"</td></tr>";
    }

    tableString += "</table></div>";

    makeCollapsible();
    getConstructorStandingsByYear();
}

function printConstructorStandings(data){
    tableString += "<button type=\"button\" class=\"collapsible blackColor whiteFont standings\"><div class=\"marginLeft10px\"><h1>World Constructors\' Championship Standings</h1></div></button>";
    tableString += "<div class=\"content greyColor whiteFont\"><table><tr><th>Pos.</th><th>Constructor</th><th>Points</th><th>Wins</th></tr>";
    let pos = 1;

    for(d of data){
        tableString += "<tr><td>" + pos++ + "</td><td>" + d.team + "</td><td>" + d.points + "</td><td>" + d.wins + "</td></tr>";
    }

    tableString += "</table></div>";

    makeCollapsible();
    getResultsByYear();
}

function makeDropdown(){
    let div = document.getElementById("dropdown");
    let select = document.createElement("select");
    select.id = "year";

    for(i = 2020; i > 1949; i--){
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        option.classList.add("blackColor");
        option.classList.add("whiteFont");
        select.appendChild(option);
    }

    div.appendChild(select);
}

function makeCollapsible(){
    var coll = document.getElementsByClassName("collapsible");
    
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

function parseDate(date){
    let arr1 = date.split('T');
    let arr2 = arr1[0].split('-');
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[Number(arr2[1]) - 1] + ' ' + arr2[2] + ' ' + arr2[0]; 
}

function clearResults(){
    document.getElementById('tableArea').innerHTML = '';
}