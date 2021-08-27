from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect

from results.models import Results
from teams.models import Teams
from standings.models import ConstructorStandings

# Create your views here.


def index(request):
    context = {'teams': Teams.objects.all().order_by('name')}
    return render(request, 'teams/index.html', context)


def team_details(request, id):
    t_drivers = list(Results.objects.select_related('driverid')
                     .distinct('driverid').filter(constructorid=id))
    t_res = ConstructorStandings.objects.select_related('raceid')\
        .select_related('constructorid').filter(constructorid=id).distinct('raceid__year')\
        .order_by('raceid__year', '-points')
    return render(request, 'teams/team_details.html', {
        'team': get_object_or_404(Teams, pk=id),
        'team_drivers': t_drivers,
        'team_results': t_res
    })
