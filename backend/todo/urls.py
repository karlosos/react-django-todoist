from django.conf.urls import url
from django.urls import path, include
from . import views


project_paths = [
    path('', views.ProjectListCreateAPIView.as_view(), name='list'),
    path('<int:pk>/', views.ProjectDetailAPIView.as_view(), name='detail')
]

urlpatterns = [
    url(
        r'^api/v1/tasks/(?P<pk>[0-9]+)$',
        views.get_delete_update_task,
        name='get_delete_update_task'
    ),
    url(
        r'^api/v1/tasks/$',
        views.get_post_tasks,
        name='get_post_tasks'
    ),
    path('projects/', include(project_paths))
]
