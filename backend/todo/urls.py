from django.urls import include, path
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register('tasks', views.TaskViewSet, basename='tasks')
router.register('projects', views.ProjectViewSet, basename='projects')

urlpatterns = [
    path('', include(router.urls))
]
