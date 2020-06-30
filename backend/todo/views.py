from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from backend.todo.serializers import UserSerializer, GroupSerializer
from rest_framework.response import Response

from .models import Task, Project
from .serializers import TaskSerializer, ProjectSerializer
from datetime import date, timedelta


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('id')
    serializer_class = TaskSerializer

    def list(self, request):
        queryset = Task.objects.all()

        tasks_filter = request.query_params.get('filter', None)
        if tasks_filter is not None:
            if tasks_filter == 'NEXT_7':
                queryset = queryset.filter(date__range=[date.today() + timedelta(days=1),
                                           date.today() + timedelta(days=7)])
            elif tasks_filter == 'TODAY':
                queryset = queryset.filter(date__exact=date.today())
            else:
                queryset = queryset.filter(project__exact=tasks_filter)
                print(tasks_filter)

        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('id')
    serializer_class = ProjectSerializer
