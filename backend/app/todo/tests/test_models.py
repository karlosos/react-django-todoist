from django.test import TestCase
from ..models import Task, Project


class TaskTest(TestCase):
    """
    Test module for Task model
    """

    def setUp(self):
        project1 = Project.objects.create(
            name="This is project"
        )

        Task.objects.create(
            archived=False,
            project=project1,
            task='This is my task'
        )

        Task.objects.create(
            archived=True,
            project=None,
            task='Second task'
        )

    def test_task_archive(self):
        second_task = Task.objects.get(task='Second task')
        self.assertEqual(second_task.archived, True)
