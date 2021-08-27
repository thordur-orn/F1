const {Pool, Client} = require('pg')
const assert = require('assert').strict;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'formula1',
  password: 'xxxx',
  port: 5432,
})

const getDrivers = (request, response) => {
    let searchString = '%' + request.query.searchQuery + '%';
    if(request.query.searchQuery == undefined){
        searchString = '%%';
    }
    console.log(searchString);
    pool.query("select id, forename, surname from drivers where concat(forename, surname) ilike $1 order by surname asc;", [searchString], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getDriver = (request, response) => {
    const driverId = parseInt(request.params.id);
    pool.query("select d.id, d.ref, d.number, d.code, d.forename, d.surname, d.dob, d.nationality, d.url, (select count(position) from results where position=1 and driverid = d.id) as wins, (select count(*) from results where driverid = d.id) as starts, (select sum(points) from results where driverid = d.id) as career_points, (select count(position) from results where driverid = d.id and position < 4) as podiums, (select count(*) from results where driverid = d.id and fastestlaprank = 1) as fastest_laps from drivers d join results e on d.id = e.driverid where d.id = $1 group by d.id order by d.surname asc;", [driverId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows[0]);
    });
}

const getDriverSeasons = (request, response) => {
    const driverId = parseInt(request.params.id);
    pool.query("select distinct on (b.year) b.year, a.points, a.wins, a.position, e.name as team, e.id as teamid from driver_standings a join races b on a.raceid = b.id join drivers c on a.driverid = c.id join results d on b.id = d.raceid and a.driverid = d.driverid join constructors e on d.constructorid = e.id where a.driverid = $1 order by b.year, a.points desc;", [driverId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getTeams = (request, response) => {
    let searchString =  '%' + request.query.searchQuery + '%';
    if(searchString == '%undefined%'){
        searchString = '%%';
    }
    
    pool.query("select id, name from constructors  where name ilike $1 order by name;", [searchString], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getTeam = (request, response) => {
    const teamId = parseInt(request.params.id);
    pool.query("select a.id as teamid, a.name as name, a.nationality, a.url, (select count(position) from results where constructorid = a.id and position = 1) as wins, (select count(*) from constructor_results where constructorid = a.id) as entries, (select sum(points) from results where constructorid = a.id) as total_points, (select count(position) from results where constructorid = a.id and position < 4) as podiums from constructors a join constructor_results e on a.id = e.constructorid where a.id = $1 group by a.id;", [teamId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows[0]);
    })
}

const getTeamSeasons = (request, response) => {
    const teamId = parseInt(request.params.id);
    pool.query("select distinct on (year) points, position, wins, year from constructor_standings a join races b on a.raceid = b.id join constructors c on a.constructorid = c.id where constructorid = $1 order by year, points desc;", [teamId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getDriversByConstructor = (request, response) => {
    const teamId = parseInt(request.params.id);
    pool.query("select distinct a.id, a.forename, a.surname from drivers a join results b on a.id = b.driverid join races c on b.raceid = c.id where b.constructorid = $1 order by surname;", [teamId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getAllCircuits = (request, response) => {
    pool.query("select * from circuits", (error, results) => {
        if(error){ 
            throw error; 
        }
        response.status(200).json(results.rows);
    })
}

const getCircuitById = (request, response) => {
    const circuitId = parseInt(request.params.id);
    pool.query("select b.year, min(a.fastestlaptime) as lap_record, c.forename as rec_forename, c.surname as rec_surname, c.id as rec_driverid, d.id, d.ref, d.name, d.location, d.country, d.url from results a join races b on a.raceid = b.id join drivers c on a.driverid = c.id join circuits d on b.circuitid = d.id where fastestlaprank = 1 and b.circuitid = $1 group by b.year, c.surname, a.fastestlaptime, c.forename, c.id, d.id, d.ref, d.name, d.location, d.country, d.url order by a.fastestlaptime limit 1;", [circuitId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows[0]);
    })    
}

const getCircuitWinners = (request, response) => {
    const circuitId = parseInt(request.params.id);
    pool.query("select a.year, c.id as driverid, c.surname, c.forename, d.name as team, d.id as teamid from races a join results b on a.id = b.raceid join drivers c on b.driverid = c.id join constructors d on b.constructorid = d.id where a.circuitid = $1 and b.position = 1 order by a.year;", [circuitId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getFinalStandingsByYear = (request, response) => {
    const year = parseInt(request.params.year);
    pool.query("select a.id as driverid, concat(a.forename, ' ' , a.surname) as driver, sum(b.points) as points, d.id as teamid, d.name as team, max(e.wins) as wins from drivers a, results b, races c, constructors d, driver_standings e where c.year = $1 and a.id = b.driverid and b.raceid = c.id and b.constructorid = d.id and e.driverid = a.id and e.raceid = c.id group by a.id, d.id order by sum(b.points) desc;",[year], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

const getStandingsByYear = (request, response) => {
    const year = parseInt(request.params.year);
    pool.query("select c.round as round, a.id as driverid, concat(a.forename, ' ', a.surname) as driver, d.id as teamid, d.name as team, e.wins, sum(b.points) over (partition by a.id order by c.round) as total_points from drivers a, results b, races c, constructors d, driver_standings e where c.year = $1 and a.id = b.driverid and b.raceid = c.id and b.constructorid = d.id and e.driverid = a.id and e.raceid = c.id group by a.id, d.id, e.wins, c.round, b.points order by c.round asc, total_points desc, e.wins desc;", [year], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getConstructorStandingsByYear = (request, response) => {
    const year = parseInt(request.params.year);
    pool.query("select a.id as teamid, a.name as team, sum(b.points) as points, max(d.wins) as wins from constructors a, constructor_results b, races c, constructor_standings d where a.id = b.constructorid and b.raceid = c.id and c.year = $1 and d.constructorid = a.id and d.raceid = c.id group by team, teamid order by points desc;", [year], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    });
}

// try: .then ( call the function again )
var resultsArr = [];
function fillResultsArray(data, request, response){
    resultsArr = [];
    for(d of data){
        resultsArr.push(d);
    }
    getResultsById(request, response)
}

const getRaceIdsByYear = (request, response) => {
    const year = parseInt(request.params.year);
    
    pool.query("select a.id, a.name, a.date, a.round, b.name as circuit, b.location, b.country from races a, circuits b where a.circuitid = b.id and year = $1", [year])
        .then(results => {
            resultsArr = [];
            for(d of results.rows){
                resultsArr.push(d);
            }
            getResultsById(request, response, 1);
        })
}

function getResultsById(request, response){
    const raceId = request.params.id;
    pool.query("select a.position, concat(b.forename, ' ', b.surname) as driver, b.id as driverid, c.status, a.points, a.timems, a.grid, a.laps, d.name as team, d.id as teamid from results a, drivers b, statuses c, constructors d, races e where a.raceid = e.id and a.driverid = b.id and a.statusid = c.id and a.constructorid = d.id and e.id = $1", [raceId], (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getResultsByYear = (request, response) => {
    const year = parseInt(request.params.year);
    
    pool.query("select a.date, a.name as racename, b.position, concat(c.forename, ' ', c.surname) as driver, c.id as driverid, d.status, a.round, b.points, b.timems, b.grid, b.laps, e.name as team, e.id as teamid, f.name as circuit, f.id as circuitid, f.location, f.country from races a, results b, drivers c, statuses d, constructors e, circuits f where a.id = b.raceid and b.driverid = c.id and b.statusid = d.id and b.constructorid = e.id and a.circuitid = f.id and year = $1 order by a.round, b.position asc;", [year], (error, results) => {
        if(error){
            throw error;
        }
        makeResults(results.rows, response);
    })
}

const getMostWins = (request, response) => {
    pool.query("select a.id, a.forename, a.surname, count(b.position) as wins from drivers a join results b on a.id = b.driverid and b.position = 1 group by a.id, a.forename, a.surname order by wins desc;", (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getMostPodiums = (request, response) => {
    pool.query("select a.id, a.forename, a.surname, count(b.position) as podiums from drivers a join results b on a.id = b.driverid and b.position < 4 group by a.id, a.forename, a.surname order by podiums desc;", (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getFastestLaps = (request, response) => {
    pool.query("select a.id, a.forename, a.surname, count(b.fastestlaptime) as fastest_laps from drivers a join results b on a.id = b.driverid and b.fastestlaprank = 1 group by a.id, a.forename, a.surname order by fastest_laps desc;", (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getEntries = (request, response) => {
    pool.query("select a.id, a.forename, a.surname, count(b.grid) as starts from drivers a join results b on a.id = b.driverid group by a.id, a.surname order by starts desc;", (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getPoles = (request, response) => {
    pool.query("select a.id, a.forename, a.surname, count(b.grid) as poles from drivers a join results b on a.id = b.driverid where b.grid = 1 group by a.id, a.surname order by poles desc;", (error, results) => {
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

function makeResults(data, response){
    let rounds = 0;
    resultsArr = [];
    for(d of data){
        if(d.round > rounds){
            rounds = d.round;
        }
    }
    for(i = 1; i < rounds + 1; i++){
        resultsArr.push(singleRaceResults(data, i));
    }

    sendRes(response, resultsArr);
}

function sendRes(response, resultsArr){
    response.status(200).json(resultsArr);
}

function singleRaceResults(data, round){
    retObj = {racename: "", circuit: "", circuitid: 0, date: "", round: "", location: "",
                country: "", results: []};

    for(d of data){
        
        if(d.round == round){
            var pos = d.position;
            if(pos == null){
                pos = 'DNF';
            }
            retObj.racename = d.racename;
            retObj.date = d.date;
            retObj.round = d.round;
            retObj.circuit = d.circuit;
            retObj.circuitid = d.circuitid;
            retObj.location = d.location;
            retObj.country = d.country;
            retObj["results"].push({driver: d.driver, driverid: d.driverid, position: pos, status: d.status, timems: d.timems, laps: d.laps, points: d.points, grid: d.grid, team: d.team, teamid: d.teamid});
        }
    }

    return retObj;
}

module.exports = {
    getDrivers,
    getDriver,
    getDriverSeasons,
    getTeams,
    getTeam,
    getTeamSeasons,
    getDriversByConstructor,
    getAllCircuits,
    getCircuitById,
    getCircuitWinners,
    getFinalStandingsByYear,
    getStandingsByYear,
    getConstructorStandingsByYear,
    getResultsByYear,
    getRaceIdsByYear,
    getResultsById,
    getMostWins,
    getMostPodiums,
    getFastestLaps,
    getEntries,
    getPoles
}