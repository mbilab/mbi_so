from django.views import generic
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.models import User

from .forms import AnswerForm
from .models import Question, Answer
from .settings import *

# Create your views here.

class IndexView(generic.ListView):
    template_name = 'so_app/index.jade'
    def get_queryset(self):
        return Question.objects.all()[:INDEX_N_QUESTION]

class QuestionCreateView(generic.CreateView):
    model = Question
    fields = ['title', 'content']
    template_name = 'so_app/question_form.jade'
    def form_valid(self, form):
        form.instance.user = get_object_or_404(User, pk=1)
        return super(QuestionCreateView, self).form_valid(form)

class QuestionDetailView(generic.CreateView):
    model = Answer
    fields = ['content']
    template_name = 'so_app/question_detail.jade'
    def form_valid(self, form):
        form.instance.user = get_object_or_404(User, pk=1)
        form.instance.question = get_object_or_404(Question, pk=self.kwargs.get('pk'))
        return super(QuestionDetailView, self).form_valid(form)
    def get_context_data(self, **kwargs):
        context = super(QuestionDetailView, self).get_context_data(**kwargs)
        context['question'] = Question.objects.get(pk=self.kwargs.get('pk'))
        return context