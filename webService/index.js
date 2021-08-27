const express = require('express')
const db = require('./queries');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000

app.use(express.json());

const url = '/api/v1'

app.get('/', (req, res) => res.json({ message: 'formula1' }))

app.get(url + '/drivers', db.getDrivers);
app.get(url + '/teams', db.getTeams);
app.get(url + '/teams/:id', db.getTeam);
app.get(url + '/drivers/:id', db.getDriver);
app.get(url + '/driverSeasons/:id', db.getDriverSeasons);
app.get(url + '/circuits', db.getAllCircuits);
app.get(url + '/circuits/:id', db.getCircuitById);
app.get(url + '/circuits/:id/winners', db.getCircuitWinners);
app.get(url + '/finalstandings/:year', db.getFinalStandingsByYear);
app.get(url + '/standings/:year', db.getStandingsByYear);
app.get(url + '/constructorStandings/:year', db.getConstructorStandingsByYear);
app.get(url + '/constructorSeasons/:id', db.getTeamSeasons);
app.get(url + '/constructors/:id/drivers', db.getDriversByConstructor);
app.get(url + '/results/:year', db.getResultsByYear);
app.get(url + '/raceIds/:year', db.getRaceIdsByYear);
app.get(url + '/races/:id', db.getResultsById);
app.get(url + '/wins', db.getMostWins);
app.get(url + '/podiums', db.getMostPodiums);
app.get(url + '/fastestlaps', db.getFastestLaps);
app.get(url + '/entries', db.getEntries);
app.get(url + '/poles', db.getPoles);

app.listen(port, () => console.log(`Formula 1 app listening on port ${port}!`))