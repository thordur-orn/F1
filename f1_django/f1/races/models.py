from django.db import models

# Create your models here.
from circuits.models import Circuits


class Races(models.Model):
    id = models.IntegerField(primary_key=True)
    year = models.IntegerField(blank=True, null=True)
    round = models.IntegerField(blank=True, null=True)
    circuitid = models.ForeignKey(Circuits, models.DO_NOTHING, db_column='circuitid', blank=True, null=True)
    name = models.CharField(max_length=250, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    url = models.CharField(max_length=250, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'races'
