from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Task, Project


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('archived', 'project', 'task', 'created_at', 'updated_at')


class ProjectSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Project
        fields = ("user", "created", "name")
