import csv
import getpass
import psycopg2
from pprint import pprint as pp

maxNumberOfRows = 4000

def connect_to_database(host, dbname, username, pw):
    conn_string = "host='{}' dbname='{}' user='{}' password='{}'".format(host, dbname, username, pw)

    print("Connecting to database {}.{} as {}".format(host, dbname, username))

    try:
        conn = psycopg2.connect(conn_string)
    except psycopg2.OperationalError as e:
        print('Connection failed!')
        print('Error message:', e)
        exit()

    cursor = conn.cursor()

    print("Connected!\n")

    return cursor, conn

def readFile(fileName, delim):
    file = open(fileName, encoding='utf-8')
    dictReader = csv.DictReader(file, delimiter = delim)

    data = []
    for i in dictReader:
        data.append(i)

    file.close()
    return data

host = 'localhost'
dbname = 'formula1'
username = 'postgres'
pw = getpass.getpass()

cursor, conn = connect_to_database(host, dbname, username, pw)

# Circuits

circuits = readFile('data/circuits.csv', ',')
circuitsInsertString = 'INSERT INTO CIRCUITS (id, ref, name, location, country, url) values '
circuitsList = []

for c in circuits:
    circuitsList.append((c['circuitId'], c['circuitRef'], c['name'], c['location'], c['country'], c['url']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s)", x) for x in circuitsList)
cursor.execute(circuitsInsertString + args_str.decode('utf-8'))

# Constructors

constructors = readFile('data/constructors.csv', ',')
constructorsInsertString = 'INSERT INTO CONSTRUCTORS (id, ref, name, nationality, url) values '
constructorsList = []

for c in constructors:
    constructorsList.append((c['constructorId'], c['constructorRef'], c['name'], c['nationality'], c['url']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s)", x) for x in constructorsList)
cursor.execute(constructorsInsertString + args_str.decode('utf-8'))

# Drivers

drivers = readFile('data/drivers.csv', ',')
driversInsertString = 'INSERT INTO DRIVERS (id, ref, number, code, forename, surname, dob, nationality, url) values '
driversList = []

for d in drivers:
    if d['number'] == 'NULL':
        number = None
    else:
        number = d['number']
    driversList.append((d['driverId'], d['driverRef'], number, d['code'], d['forename'], d['surname'], d['dob'],
                        d['nationality'], d['url']))

args_str = b','.join(cursor.mogrify("(%s, %s,%s,%s,%s,%s,%s,%s,%s)", x) for x in driversList)
cursor.execute(driversInsertString + args_str.decode('utf-8'))

# Statuses

statuses = readFile('data/status.csv', ',')
statusInsertString = 'INSERT INTO STATUSES (id, status) values '
statusList = []

for s in statuses:
    statusList.append((s['statusId'], s['status']))

args_str = b','.join(cursor.mogrify("(%s,%s)", x) for x in statusList)
cursor.execute(statusInsertString + args_str.decode('utf-8'))

# Seasons

seasons = readFile('data/seasons.csv', ',')
seasonsInsertString = 'INSERT INTO SEASONS (year, url) values '
seasonsList = []

for s in seasons:
    seasonsList.append((s['year'], s['url']))

args_str = b','.join(cursor.mogrify("(%s,%s)", x) for x in seasonsList)
cursor.execute(seasonsInsertString + args_str.decode('utf-8'))

# Races

races = readFile('data/races.csv', ',')
racesInsertString = 'INSERT INTO RACES (id, year, round, circuitId, name, date, time, url) values '
racesList = []

for r in races:
    if r['time'] == 'NULL':
        time = None
    else:
        time = r['time']

    if r['date'] == 'NULL':
        date = None
    else:
        date = r['date']
    
    racesList.append((r['raceId'], r['year'], r['round'], r['circuitId'], r['name'], date,
                        time, r['url']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s)", x) for x in racesList)
cursor.execute(racesInsertString + args_str.decode('utf-8'))

# Constructor Standings

constructorStandings = readFile('data/constructor_standings.csv', ',')
csInsertString = 'INSERT INTO CONSTRUCTOR_STANDINGS (id, raceId, constructorId, points, position, wins) values '
csList = []

for c in constructorStandings:
    csList.append((c['constructorStandingsId'], c['raceId'], c['constructorId'], c['points'], c['position'],
                        c['wins']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s)", x) for x in csList)
cursor.execute(csInsertString + args_str.decode('utf-8'))

# Constructor Results

constructorResults = readFile('data/constructor_results.csv', ',')
crInsertString = 'INSERT INTO CONSTRUCTOR_RESULTS (id, raceId, constructorId, points) values '
crList = []

for c in constructorResults:
    crList.append((c['constructorResultsId'], c['raceId'], c['constructorId'], c['points']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s)", x) for x in crList)
cursor.execute(crInsertString + args_str.decode('utf-8'))

# Driver Standings

driverStandings = readFile('data/driver_standings.csv', ',')
dsInsertString = 'INSERT INTO DRIVER_STANDINGS (id, raceId, driverId, points, position, wins) values '
dsList = []

for d in driverStandings:
    dsList.append((d['driverStandingsId'], d['raceId'], d['driverId'], d['points'], d['position'], d['wins']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s)", x) for x in dsList)
cursor.execute(dsInsertString + args_str.decode('utf-8'))

# Lap Times

lapTimes = readFile('data/lap_times.csv', ',')
lapTimesInsertString = 'INSERT INTO LAP_TIMES (raceId, driverId, lap, position, time) values '
lapTimesList = []

for l in lapTimes: 
    lapTimesList.append((l['raceId'], l['driverId'], l['lap'], l['position'], l['time']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s)", x) for x in lapTimesList)
cursor.execute(lapTimesInsertString + args_str.decode('utf-8'))

# Pit Stops

pitStops = readFile('data/pit_stops.csv', ',')
pitStopsInsertString = 'INSERT INTO PIT_STOPS (raceId, driverId, stop, lap, time, duration) values '
pitStopsList = []

for p in pitStops:
    if ':' in p['duration']:
        dur = p['duration']
    else:
        dur = '00:' + p['duration']
    pitStopsList.append((p['raceId'], p['driverId'], p['stop'], p['lap'], p['time'], dur))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s)", x) for x in pitStopsList)
cursor.execute(pitStopsInsertString + args_str.decode('utf-8'))

# Qualifying

qualifying = readFile('data/qualifying.csv', ',')
qualifyingInsertString = 'INSERT INTO QUALIFYING (id, raceId, driverId, constructorId, number, position, q1Time, q2Time, q3Time) values '
qualifyingList = []

for q in qualifying:
    if q['q1'] == 'NULL' or q['q1'] == '':
        q1 = None
    else:
        q1 = q['q1']
    
    if q['q2'] == 'NULL' or q['q2'] == '':
        q2 = None
    else:
        q2 = q['q2']

    if q['q3'] == 'NULL' or q['q3'] == '':
        q3 = None
    else:
        q3 = q['q3']

    qualifyingList.append((q['qualifyId'], q['raceId'], q['driverId'], q['constructorId'], q['number'], q['position'],
                            q1, q2, q3))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s)", x) for x in qualifyingList)
cursor.execute(qualifyingInsertString + args_str.decode('utf-8'))

# Results

results = readFile('data/results.csv', ',')
resultsInsertString = 'INSERT INTO RESULTS (id, raceId, driverId, constructorId, number, grid, position, positionOrder, points, laps, timeMS, fastestLapNr, fastestLapRank, fastestLapTime, statusId) values '
resultsList = []

for r in results:
    if r['position'] == 'NULL':
        position = None
    else:
        position = r['position']

    if r['milliseconds'] == 'NULL':
        milliseconds = None
    else:
        milliseconds = r['milliseconds']
    
    if r['fastestLap'] == 'NULL':
        fastestLapNr = None
    else:
        fastestLapNr = r['fastestLap']

    if r['rank'] == 'NULL':
        rank = None
    else:
        rank = r['rank']

    if r['fastestLapTime'] == 'NULL':
        fastestLapTime = None
    else:
        fastestLapTime = r['fastestLapTime']

    if r['number'] == 'NULL':
        number = None
    else:
        number = r['number']
    
    resultsList.append((r['resultId'], r['raceId'], r['driverId'], r['constructorId'], number, r['grid'],
                        position, r['positionOrder'], r['points'], r['laps'], milliseconds, fastestLapNr,
                        rank, fastestLapTime, r['statusId']))

args_str = b','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", x) for x in resultsList)
cursor.execute(resultsInsertString + args_str.decode('utf-8'))

conn.commit()
cursor.close()
conn.close()