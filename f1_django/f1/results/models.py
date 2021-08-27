from django.db import models

# Create your models here.
from drivers.models import Drivers
from races.models import Races
from teams.models import Teams


class Results(models.Model):
    id = models.IntegerField(primary_key=True)
    raceid = models.ForeignKey(Races, models.DO_NOTHING, db_column='raceid', blank=True, null=True)
    driverid = models.ForeignKey(Drivers, models.DO_NOTHING, db_column='driverid', blank=True, null=True)
    constructorid = models.ForeignKey(Teams, models.DO_NOTHING, db_column='constructorid', blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    grid = models.IntegerField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    positionorder = models.IntegerField(blank=True, null=True)
    points = models.FloatField(blank=True, null=True)
    laps = models.IntegerField(blank=True, null=True)
    timems = models.IntegerField(blank=True, null=True)
    fastestlapnr = models.IntegerField(blank=True, null=True)
    fastestlaprank = models.IntegerField(blank=True, null=True)
    fastestlaptime = models.TimeField(blank=True, null=True)
    statusid = models.ForeignKey('Statuses', models.DO_NOTHING, db_column='statusid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'results'


class ConstructorResults(models.Model):
    id = models.IntegerField(primary_key=True)
    raceid = models.ForeignKey(Races, models.DO_NOTHING, db_column='raceid', blank=True, null=True)
    constructorid = models.ForeignKey(Teams, models.DO_NOTHING, db_column='constructorid', blank=True, null=True)
    points = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'constructor_results'


class Statuses(models.Model):
    id = models.IntegerField(primary_key=True)
    status = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'statuses'
