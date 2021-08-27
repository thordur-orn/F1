from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="teams-index"),
    path('<int:id>', views.team_details, name="team-details"),
]