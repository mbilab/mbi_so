from allauth.account.forms import LoginForm
from django.db.models import NullBooleanField, Case, Count, F, Q, When
from datetime import datetime
from django.views import generic
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth.models import User

from .forms import AnswerForm, QuestionForm
from .models import *
from .settings import *

# Create your views here.

def answer_create(request, pk):
    form = AnswerForm(request.POST)
    if form.is_valid() == False:
        return JsonResponse({
            '__all__': 'Answer cannot be empty', # use __all__ to utalize the message system
            **form.errors
        }, status=400)
    if request.user.is_authenticated() == False:
        return JsonResponse({'__all__': 'Please login to answer'}, status=400)
    question = get_object_or_404(Question, pk=pk)
    answer = Answer.objects.create(
    #answer = Answer(
        user=request.user,
        question=question,
        content=request.POST['content']
    )
    return JsonResponse(model_to_dict(answer))

def answers(request, pk):
    question = get_object_or_404(Question, pk=pk)
    up_count   = Count(Case(When(vote__weight=True,  then=1)))
    down_count = Count(Case(When(vote__weight=False, then=1)))
    answers = question.answer_set.all()[:QUESTION_N_ANSWER].annotate(
        vote__count=up_count - down_count,
        vote__weight=Case(When(vote__user=1, then=F('vote__weight')), default=None, output_field=NullBooleanField()) #! should be current login user
    )
    return JsonResponse({
        'answers': list(answers.values('pk', 'vote__weight', 'vote__count', 'user__username', 'date', 'content'))
    })

def auth(request):
    if request.user.is_authenticated():
        return JsonResponse({
            'logout': True,
            'username': request.user.username
        })
    return JsonResponse({
        'login': True
    })

class IndexView(generic.ListView):
    model = Question
    paginate_by = INDEX_N_QUESTION
    template_name = 'so_app/index.jade'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context['login_form'] = LoginForm
        context['question_form'] = QuestionForm
        return context

def question_create(request):
    form = QuestionForm(request.POST)
    if form.is_valid() == False:
        return JsonResponse(form.errors, status=400)
    if request.user.is_authenticated() == False:
        return JsonResponse({'__all__': 'Please login to ask a question'}, status=400)
    question = Question.objects.create(
    #question = Question(
        user=request.user,
        title=request.POST['title'],
        content=request.POST['content']
    )
    return JsonResponse(model_to_dict(question))

class QuestionDetailView(generic.edit.FormMixin, generic.DetailView):
    model = Question
    form_class = AnswerForm
    template_name = 'so_app/question.jade'

def questions(request):
    questions = Question.objects.all()[:INDEX_N_QUESTION].annotate(Count('answer'))
    return JsonResponse({
        'questions': list(questions.values('pk', 'answer__count', 'user__username', 'date', 'title', 'content'))
    })

def vote(request, pk, weight):
    user = get_object_or_404(User, pk=1) #! should be current login user
    answer = get_object_or_404(Answer, pk=pk)
    weight = weight == 'up'
    votes = Vote.objects.filter(user=user, answer=answer)
    if votes.count() > 0:
        vote = votes[0]
        vote.weight = None if vote.weight == weight else weight
        vote.save()
    else:
        vote = Vote.objects.create(
            user=user,
            answer=answer,
            weight=weight
        )
    return JsonResponse(model_to_dict(vote))

# vi:et:sw=4:ts=4
