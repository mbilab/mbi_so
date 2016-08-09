from django.views import generic
from django.shortcuts import get_object_or_404, render

from .forms import AnswerForm
from .models import Question, Answer

# Create your views here.

class IndexView(generic.ListView):
  template_name = 'so_app/index.html'
  def get_queryset(self):
    return Question.objects.all()[:5]

class QuestionCreateView(generic.CreateView):
  model = Question
  fields = ['user', 'title', 'content']

class QuestionDetailView(generic.CreateView):
  model = Answer
  fields = ['user', 'content']
  template_name = 'so_app/question_detail.html'
  def form_valid(self, form):
    form.instance.question = get_object_or_404(Question, pk=self.kwargs.get('pk'))
    return super(QuestionDetailView, self).form_valid(form)
  def get_context_data(self, **kwargs):
    context = super(QuestionDetailView, self).get_context_data(**kwargs)
    context['question'] = Question.objects.get(pk=self.kwargs.get('pk'))
    return context
