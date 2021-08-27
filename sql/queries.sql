select a.position, a.number, b.surname, c.name, d.status, a.grid, a.points
from results a, drivers b, constructors c, statuses d
where a.driverid = b.id and a.statusid = d.id and a.constructorid = c.id
and a.raceid = 163;

select a.id, a.name, b.surname
from races a, drivers b, results c
where a.year = 2009 and c.raceid = a.id and c.position = 1;

select a.name as race, concat(b.forename, ' ', b.surname) as winner
from races a, drivers b, results c
where a.year = 2019 and c.raceid = a.id and c.position = 1 and c.driverid = b.id;

-- Championship standings by year
select concat(a.forename, ' ', a.surname), sum(b.points)
from drivers a, results b, races c
where c.year = 2019 and a.id = b.driverid and b.raceid = c.id
group by a.forename, a.surname
order by sum(b.points) desc;

-- All results by year 
select a.date, a.name, b.position, concat(c.forename, ' ', c.surname), d.status
from races a, results b, drivers c, statuses d
where a.id = b.raceid and b.driverid = c.id and b.statusid = d.id and year = 2020
order by a.date, b.position asc;

--

select a.name as race, concat(b.forename, ' ', b.surname) as winner, c.points,
case
when c.points = 25 then 10
when c.points = 18 then 8
when c.points = 15 then 6
when c.points = 12 then 5
when c.points = 10 then 4
when c.points = 8 then 3
when c.points = 6 then 2
when c.points = 4 then 1
when c.points = 2 or c.points = 1 or c.points = 0 then 0
end as old_points
from races a, drivers b, results c
where a.year = 2010 and c.raceid = a.id and c.driverid = b.id;

select concat(a.forename, ' ', a.surname), sum(b.points) as new_points,
sum(case
when b.points = 25 then 10
when b.points = 18 then 8
when b.points = 15 then 6
when b.points = 12 then 5
when b.points = 10 then 4
when b.points = 8 then 3
when b.points = 6 then 2
when b.points = 4 then 1
when b.points = 2 or b.points = 1 or b.points = 0 then 0
end) as old_points
from drivers a, results b, races c
where c.year = 2019 and a.id = b.driverid and b.raceid = c.id
group by a.forename, a.surname
order by sum(b.points) desc;

/* Recent years with old scoring system */ 
select c.name, b.position, b.points as new_points,
case
when b.points = 25 or b.points = 26 then 10
when b.points = 18 or b.points = 19 then 8
when b.points = 15 or b.points = 16 then 6
when b.points = 12 or b.points = 13 then 5
when b.points = 10 or b.points = 11 then 4
when b.points = 8 or b.points = 9 then 3
when b.points = 6 or b.points = 7 then 2
when b.points = 4 or b.points = 5 then 1
when b.points = 2 or b.points = 1 or b.points = 0 then 0
end as old_points
from drivers a, results b, races c
where a.id = b.driverid and b.raceid = c.id and a.id = 822 and c.year = 2019;

/* Former years with current scoring system */
select concat(a.forename, ' ', a.surname), sum(b.points) as old_points,
sum(case
	when b.position = 1 then 25
	when b.position = 2 then 18
	when b.position = 3 then 15
	when b.position = 4 then 12
	when b.position = 5 then 10
	when b.position = 6 then 8
	when b.position = 7 then 6
	when b.position = 8 then 4
	when b.position = 9 then 2
	when b.position = 10 then 1
	when b.position > 10 then 0
end) as new_points
from drivers a, results b, races c
where c.year = 1999 and a.id = b.driverid and b.raceid = c.id
group by a.forename, a.surname
order by sum(b.points) desc;

/* Most total wins */
select concat(a.forename, ' ', a.surname), count(b.position)
from drivers a, results b
where a.id = b.driverid and b.position = 1
group by a.id
order by sum(position) desc;

/* Get all drivers with wins, total points and podiums */

select d.id, d.ref, d.number, d.code, d.forename, d.surname, d.dob, d.nationality, d.url,
count(e.position) as wins,
(select count(*) from results where driverid = d.id) as starts,
(select sum(points) from results where driverid = d.id) as career_points,
(select count(position) from results where driverid = d.id and position < 4) as podiums
from drivers d join results e on d.id = e.driverid
where e.position = 1
group by d.id
order by d.id asc;

/* select one single driver with wins..,.... */
select d.id, d.ref, d.number, d.code, d.forename, d.surname, d.dob, d.nationality, d.url, (select count(position) from results where position=1 and driverid = d.id) as wins, (select count(*) from results where driverid = d.id) as starts, (select sum(points) from results where driverid = d.id) as career_points, (select count(position) from results where driverid = d.id and position < 4) as podiums from drivers d join results e on d.id = e.driverid where d.id = 4 group by d.id order by d.surname asc;

/* constructor details */
select a.id, a.name, a.nationality, a.url, 
(select count(position) from results where constructorid = a.id and position = 1) as wins,
(select count(*) from constructor_results where constructorid = a.id) as starts,
(select sum(points) from results where constructorid = a.id) as total_points,
(select count(position) from results where constructorid = a.id and position < 4) as podiums
from constructors a join constructor_results e on a.id = e.constructorid
where a.id = 161
group by a.id;

/* lap records at each circuit */
select distinct a.circuitid, min(b.time) from races a join lap_times b on a.id = b.raceid 
group by a.circuitid
order by a.circuitid;

select a.id, a.ref, a.name, a.location, a.country, a.url, min(b.time)
from circuits a join races c on a.id = c.circuitid join lap_times b on c.id = b.raceid
where a.id = 69
group by a.id;

/* Winners at circuit */
select a.year, c.id as driverid, c.surname, c.forename, d.name as team, d.id as teamid 
from races a join results b on a.id = b.raceid join drivers c on b.driverid = c.id 
join constructors d on b.constructorid = d.id
where a.circuitid = $1 and b.position = 1 
order by a.year;

select b.surname, max(a.points) as points, a.position, a.wins, c.year as year
from driver_standings a join drivers b on a.driverid = b.id join races c on a.raceid = c.id
where b.id = 1
group by b.surname, a.position, a.wins, c.year
order by points desc;

select distinct on (year) year, max(points), max(wins), position from
(select points, driverid, position, wins, year, round
 from driver_standings a join races b on a.raceid = b.id join drivers c on a.driverid = c.id) as res
where driverid = 1
group by res.year, res.position;

/* All drivers by constructorid */
select distinct a.id, concat(a.forename, ' ', a.surname)
from drivers a join results b on a.id = b.driverid
where b.constructorid = 2;

/* Points for each year by constructorid */
select a.year, max(b.points)
from races a join constructor_standings b on a.id = b.raceid
where b.constructorid = 1
group by a.year order by a.year desc;

/* standings for each constructor in each year */
select distinct on (year) points, position, wins, year
 from constructor_standings a join races b on a.raceid = b.id join constructors c on a.constructorid = c.id
 where constructorid = 1
 order by year, points desc;

/* driver stats on a given year */
select d.id, d.ref, d.number, d.code, d.forename, d.surname, d.dob, d.nationality, d.url, 
(select count(position) from results a join races b on a.raceid = b.id 
 where a.position=1 and a.driverid = d.id and b.year = 2006) as wins, 
(select count(*) from results a join races b on a.raceid = b.id 
 where driverid = d.id and b.year = 2006) as starts, 
(select count(*) from results a join races b on a.raceid = b.id
 where driverid = d.id and position is not null and b.year = 2006) as finishes,
(select sum(points) from results a join races b on a.raceid = b.id
 where driverid = d.id and b.year = 2006) as points, 
(select count(position) from results a join races b on a.raceid = b.id
 where driverid = d.id and position < 4 and b.year = 2006) as podiums 
from drivers d join results e on d.id = e.driverid 
where d.id = 30
group by d.id 
order by d.surname asc;


INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (598, 222, 1, 1, '00:01:00.000');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (444, 182, 22, 1, '00:01:45.353');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (469, 182, 12, 1, '00:01:30.831');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (482, 105, 1, 1, '00:01:19.639');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (516, 203, 1, 1, '00:01:16.44');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (654, 235, 1, 1, '00:01:02.74');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (534, 182, 1, 1, '00:01:24.836');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (558, 207, 56, 1, '00:01:13.299');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (608, 238, 1, 1, '00:01:23.8');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (594, 304, 37, 1, '00:01:11.31');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (625, 278, 1, 1, '00:02:53.9');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (653, 223, 1, 1, '00:01:32.2');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (712, 356, 1, 1, '00:02:11.4');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (683, 289, 1, 1, '00:01:36.7');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (692, 385, 1, 1, '00:02:11.3');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (699, 373, 80, 1, '00:01:27.6');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (715, 364, 32, 1, '00:01:10.56');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (733, 373, 1, 1, '00:01:55.0');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (753, 341, 33, 1, '00:02:27.53');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (755, 356, 71, 1, '00:01:56.3');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (761, 479, 1, 1, '00:02:04.5');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (762, 475, 1, 1, '00:02:05.07');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (764, 427, 39, 1, '00:03:05.0');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (775, 475, 21, 1, '00:02:22.5');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (782, 475, 1, 1, '00:09:44.6');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (805, 579, 34, 1, '00:02:39.7');
INSERT INTO lap_times (raceid, driverid, lap, position, time) VALUES (807, 647, 3, 1, '00:02:20.4');