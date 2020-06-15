from django.conf.urls import url
from . import views


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
    )
]
