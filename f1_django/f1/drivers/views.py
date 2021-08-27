from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from drivers.models import Drivers

# Create your views here.
from results.models import Results
from standings.models import DriverStandings


def index(request):
    context = {'drivers': Drivers.objects.all().order_by('surname')}
    return render(request, 'drivers/index.html', context)


def driver_details(request, id):
    d_res = list(DriverStandings.objects.select_related('raceid') \
                 .select_related('driverid').filter(driverid=id).distinct('raceid__year')
                 .order_by('raceid__year', '-points'))
    for d in d_res:
        d.team = 'Ferrari'
    return render(request, 'drivers/driver_details.html', {
        'driver': get_object_or_404(Drivers, pk=id),
        'driver_results': d_res
    })
