from django.contrib import admin

from .models import *

# Register your models here.

class AnswerInline(admin.TabularInline):
  model = Answer
  extra = 0

class QuestionCommentInline(admin.TabularInline):
  model = QuestionComment
  extra = 0

class QuestionAdmin(admin.ModelAdmin):
  inlines = [AnswerInline, QuestionCommentInline]

admin.site.register(Question, QuestionAdmin)
admin.site.register(Vote)
