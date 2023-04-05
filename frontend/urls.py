
from django.urls import path
from . import views


app_name = 'frontend'

urlpatterns = [
    path('', views.index, name= ""),
    path('join', views.index, name="index"),
    path('create', views.index, name="index"),
    path('room/<str:roomCode>', views.index),
    path('join_room', views.index,),
    path('info', views.index,)
]
