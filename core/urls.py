from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('contact/', views.contact, name='contact'),
    path('about/', views.about, name='about'),
    path('leadership/', views.leadership, name='leadership'),
    path('membership/', views.membership, name='membership'),

]
handler404 = '.views.custom_404_view'