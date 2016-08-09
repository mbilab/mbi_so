from django.conf.urls import url

from . import views

app_name = 'main'
urlpatterns = [
    url(r'^$', views.index),
]

# vi:et:sw=4:sts=4
