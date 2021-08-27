from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name="drivers-index"),
    path('<int:id>', views.driver_details, name="driver-details"),
]