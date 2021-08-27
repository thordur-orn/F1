# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class LapTimes(models.Model):
    raceid = models.ForeignKey('Races', models.DO_NOTHING, db_column='raceid', blank=True, null=True)
    driverid = models.ForeignKey(Drivers, models.DO_NOTHING, db_column='driverid', blank=True, null=True)
    lap = models.IntegerField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lap_times'


class PitStops(models.Model):
    raceid = models.ForeignKey('Races', models.DO_NOTHING, db_column='raceid', blank=True, null=True)
    driverid = models.ForeignKey(Drivers, models.DO_NOTHING, db_column='driverid', blank=True, null=True)
    stop = models.IntegerField(blank=True, null=True)
    lap = models.IntegerField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    duration = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pit_stops'


class Qualifying(models.Model):
    id = models.IntegerField(primary_key=True)
    raceid = models.ForeignKey('Races', models.DO_NOTHING, db_column='raceid', blank=True, null=True)
    driverid = models.ForeignKey(Drivers, models.DO_NOTHING, db_column='driverid', blank=True, null=True)
    constructorid = models.ForeignKey(Constructors, models.DO_NOTHING, db_column='constructorid', blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    position = models.IntegerField(blank=True, null=True)
    q1time = models.TimeField(blank=True, null=True)
    q2time = models.TimeField(blank=True, null=True)
    q3time = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qualifying'


class Seasons(models.Model):
    year = models.IntegerField(primary_key=True)
    url = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'seasons'
