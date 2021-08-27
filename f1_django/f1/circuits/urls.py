from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="circuits-index"),
    path('<int:id>', views.circuit_details, name="circuit-details"),
]