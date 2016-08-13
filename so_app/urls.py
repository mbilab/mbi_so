from django.conf.urls import url

from . import views

app_name = 'so_app'
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    #url(r'^question/create$', views.QuestionCreateView.as_view(), name='question-create'),
    url(r'^question/create$', views.question_create, name='question_create'),
    url(r'^question/(?P<pk>[0-9]+)/$', views.QuestionDetailView.as_view(), name='question-detail'),
]
