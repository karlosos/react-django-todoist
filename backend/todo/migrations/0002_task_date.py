# Generated by Django 3.0.7 on 2020-06-30 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='date',
            field=models.DateField(null=True),
        ),
    ]
