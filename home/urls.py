from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('skills/search', views.skills_search, name='skills_search'),

]


