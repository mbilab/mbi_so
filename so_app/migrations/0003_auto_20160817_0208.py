# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-17 02:08
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('so_app', '0002_vote'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2016, 8, 17, 2, 8, 9, 603900, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vote',
            name='weight',
            field=models.NullBooleanField(),
        ),
    ]