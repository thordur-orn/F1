from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from django.shortcuts import render, get_object_or_404, redirect
from circuits.models import Circuits


# Create your views here.
from results.models import Results


def index(request):
    context = {'circuits': Circuits.objects.all().order_by('name')}
    return render(request, 'circuits/index.html', context)


def circuit_details(request, id):
    winners = list(Results.objects.select_related('raceid')
                   .select_related('driverid').select_related('constructorid')
                   .filter(raceid__circuitid=id).filter(position=1)
                   .order_by('raceid__year'))

    return render(request, 'circuits/circuit_details.html',{
        'circuit': get_object_or_404(Circuits, pk=id),
        'winners': winners
    })
