from django.db import models

# Create your models here.


class Teams(models.Model):
    id = models.IntegerField(primary_key=True)
    ref = models.CharField(max_length=250, blank=True, null=True)
    name = models.CharField(max_length=250, blank=True, null=True)
    nationality = models.CharField(max_length=250, blank=True, null=True)
    url = models.CharField(max_length=250, blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'constructors'
