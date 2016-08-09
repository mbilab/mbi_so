from django.contrib import admin

from .models import Answer, Question

# Register your models here.
class AnswerInline(admin.TabularInline):
  model = Answer
  extra = 2

class QuestionAdmin(admin.ModelAdmin):
  inlines = [AnswerInline]

admin.site.register(Question, QuestionAdmin)
