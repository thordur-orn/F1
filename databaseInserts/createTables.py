import csv
import getpass
import psycopg2
from pprint import pprint

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

def createTables():
    commands = [
        """ 
        CREATE TABLE circuits (
            id INT PRIMARY KEY,
            ref VARCHAR(250),
            name VARCHAR(250),
            location VARCHAR(250),
            country VARCHAR(250),
            url VARCHAR(250))
        """,
        """
        CREATE TABLE constructors(
            id INT PRIMARY KEY,
            ref VARCHAR(250),
            name VARCHAR(250),
            nationality VARCHAR(250),
            url VARCHAR(250));
        """,
        """
        CREATE TABLE drivers(
            id INT PRIMARY KEY,
            ref VARCHAR(250),
            number INT,
            code VARCHAR(10),
            forename VARCHAR(100),
            surname VARCHAR(100),
            dob DATE,
            nationality VARCHAR(100),
            url VARCHAR(250));
        """,
        """
        CREATE TABLE statuses(
            id INT,
            status VARCHAR(100),
            PRIMARY KEY(id));
        """,
        """
        CREATE TABLE seasons (
            year int,
            url varchar(250),
            PRIMARY KEY(year));
        """,
        """
        CREATE TABLE races (
            id INT,
            year INT,
            round INT,
            circuitId INT references circuits(id),
            name VARCHAR(250),
            date DATE,
            time TIME,
            url varchar(250),
            PRIMARY KEY(id));
        """,
        """
        CREATE TABLE constructor_standings (
            id INT PRIMARY KEY,
            raceId INT references races(id),
            constructorId INT references constructors(id),
            points DOUBLE PRECISION,
            position INT,
            wins INT);
        """,
        """
        CREATE TABLE constructor_results(
            id INT PRIMARY KEY,
            raceId INT references races(id),
            constructorId INT references constructors(id),
            points DOUBLE PRECISION);
        """,
        """
        CREATE TABLE driver_standings(
            id INT PRIMARY KEY,
            raceId INT references races(id),
            driverId INT references drivers(id),
            points DOUBLE PRECISION,
            position INT,
            wins INT);
        """,
        """
        CREATE TABLE lap_times(
            raceId INT references races(id),
            driverId INT references drivers(id),
            lap INT,
            position INT,
            time TIME);
        """,
        """
        CREATE TABLE pit_stops(
            raceId INT references races(id),
            driverId INT references drivers(id),
            stop INT,
            lap INT,
            time TIME,
            duration TIME);
        """,
        """
        CREATE TABLE qualifying(
            id INT PRIMARY KEY,
            raceId INT references races(id),
            driverId INT references drivers(id),
            constructorId INT references constructors(id),
            number INT,
            position INT,
            q1Time TIME,
            q2Time TIME,
            q3Time TIME);
        """,
        """
        CREATE TABLE results(
            id INT PRIMARY KEY,
            raceId int references races(id),
            driverId int references drivers(id),
            constructorId int references constructors(id),
            number int,
            grid int,
            position int,
            positionOrder int,
            points DOUBLE PRECISION,
            laps int,
            timeMS int,
            fastestLapNr int,
            fastestLapRank int,
            fastestLapTime TIME,
            statusId int references statuses(id));
        """
    ]
           
    for c in commands:
        cursor.execute(c)

def dropTables():
    cursor.execute('DROP TABLE IF EXISTS seasons')
    cursor.execute('DROP TABLE IF EXISTS constructor_standings')
    cursor.execute('DROP TABLE IF EXISTS constructor_results')
    cursor.execute('DROP TABLE IF EXISTS driver_standings')
    cursor.execute('DROP TABLE IF EXISTS lap_times')
    cursor.execute('DROP TABLE IF EXISTS pit_stops')
    cursor.execute('DROP TABLE IF EXISTS qualifying')
    cursor.execute('DROP TABLE IF EXISTS results')    
    cursor.execute('DROP TABLE IF EXISTS races')
    cursor.execute('DROP TABLE IF EXISTS statuses')
    cursor.execute('DROP TABLE IF EXISTS circuits')
    cursor.execute('DROP TABLE IF EXISTS constructors')
    cursor.execute('DROP TABLE IF EXISTS drivers')

host = 'localhost'
# dbname = input('Database name: ')
# username = input('User name for {}.{}: '.format(host, dbname))
dbname = 'formula1'
username = 'postgres'
pw = getpass.getpass()

cursor, conn = connect_to_database(host, dbname, username, pw)

dropTables()
createTables()

conn.commit()
cursor.close()
conn.close()