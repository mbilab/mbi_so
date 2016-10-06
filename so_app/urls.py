from django.conf.urls import url

from . import views

app_name = 'so_app'
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^auth$', views.auth, name='auth'),
    url(r'^questions$', views.questions, name='questions'),
    url(r'^question/create$', views.question_create, name='question_create'),
    url(r'^question/(?P<pk>[0-9]+)/$', views.QuestionDetailView.as_view(), name='question_detail'),
    url(r'^question/(?P<pk>[0-9]+)/answer/create$', views.answer_create, name='answer_create'),
    url(r'^question/(?P<pk>[0-9]+)/answers$', views.answers, name='answers'),
    url(r'^question/[0-9]+/answer/(?P<pk>[0-9]+)/vote/(?P<weight>down|up)$', views.vote, name='vote'),
    url(r'^question/(?P<pk>[0-9]+)/comment/create$', views.question_comment_create, name='question_comment_create'),
]
