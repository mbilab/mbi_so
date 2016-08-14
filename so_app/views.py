from django.db.models import Count
from datetime import datetime
from django.views import generic
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth.models import User

from .forms import AnswerForm, QuestionForm
from .models import Answer, Question
from .settings import *

# Create your views here.

class IndexView(generic.FormView):
    form_class = QuestionForm
    template_name = 'so_app/index.jade'
    def get_queryset(self):
        return Question.objects.all()[:INDEX_N_QUESTION]

def question_create(request):
    form = QuestionForm(request.POST)
    if form.is_valid() == False:
        return JsonResponse(form.errors)
    user = get_object_or_404(User, pk=1) #! should be current login user
    question = Question.objects.create(
        user=user,
        title=request.POST['title'],
        content=request.POST['content']
    )
    return JsonResponse(dict({'ok': True}, **model_to_dict(question)))

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

def questions(request):
    questions = Question.objects.all()[:INDEX_N_QUESTION].annotate(Count('answer'))
    return JsonResponse(list(questions.values('pk', 'user', 'title', 'content', 'date', 'answer__count')), safe=False)
