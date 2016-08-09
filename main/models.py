from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Question(models.Model):
  user = models.ForeignKey(User, unique=True)
  title = models.CharField(max_length=200)
  content = models.CharField(max_length=200)
  pub_time = models.DateTimeField(auto_now_add=True)
  mod_time = models.DateTimeField()
  active = models.BooleanField(default=True)
