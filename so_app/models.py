from django.db import models
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User

# Create your models here.
class Question(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  content = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  def get_absolute_url(self):
    return reverse('so_app:question-detail', kwargs={'pk': self.pk})
  def __str__(self):
    return self.title

class Answer(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  content = models.TextField()
  date = models.DateTimeField(auto_now_add=True)
  def get_absolute_url(self):
    return reverse('so_app:question-detail', kwargs={'pk': self.question.pk})
