from django.test import TestCase
from ..models import Task
from ..serializers import TaskSerializer
class TaskTest(TestCase):
    """
    Test module for Task model
    """

    def setUp(self):
        Task.objects.create(
            archived=False,
            project='Sample project',
            task='This is my task'
        )

        Task.objects.create(
            archived=True,
            project='Sample project',
            task='Second task'
        )

    def test_task_archive(self):
        second_task = Task.objects.get(task='Second task')
        self.assertEqual(second_task.archived, True)
        print('This is unit test')
