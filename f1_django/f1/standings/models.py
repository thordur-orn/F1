from django.db import models

# Create your models here.
from drivers.models import Drivers
from races.models import Races
from teams.models import Teams


class ConstructorStandings(models.Model):
    id = models.IntegerField(primary_key=True)
    raceid = models.ForeignKey(Races, models.DO_NOTHING, db_column='raceid', blank=True, null=True)
    constructorid = models.ForeignKey(Teams, models.DO_NOTHING, db_column='constructorid', blank=True, null=True)
    points = models.FloatField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    wins = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'constructor_standings'


class DriverStandings(models.Model):
    id = models.IntegerField(primary_key=True)
    raceid = models.ForeignKey(Races, models.DO_NOTHING, db_column='raceid', blank=True, null=True)
    driverid = models.ForeignKey(Drivers, models.DO_NOTHING, db_column='driverid', blank=True, null=True)
    points = models.FloatField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    wins = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.driverid.forename + ' ' + self.driverid.surname + ', ' + str(self.raceid.year)

    class Meta:
        managed = False
        db_table = 'driver_standings'
