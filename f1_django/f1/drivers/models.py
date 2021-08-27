from django.db import models

# Create your models here.


class Drivers(models.Model):
    id = models.IntegerField(primary_key=True)
    ref = models.CharField(max_length=250, blank=True, null=True)
    number = models.IntegerField(blank=True, null=True)
    code = models.CharField(max_length=10, blank=True, null=True)
    forename = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    nationality = models.CharField(max_length=100, blank=True, null=True)
    url = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.forename + ' ' + self.surname

    class Meta:
        managed = False
        db_table = 'drivers'
