import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import Task
from ..serializers import TaskSerializer


# initialize the APIClient app
client = Client()


class GetAllTasksTest(TestCase):
    """ Test module for GET all tasks API """

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

    def test_get_all_tasks(self):
        # get API response
        response = client.get(reverse('get_post_tasks'))
        # get data from db
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class GetSingleTaskTest(TestCase):
    """ Test module for GET single task API """

    def setUp(self):
        self.first = Task.objects.create(
            archived=False,
            project='Sample project',
            task='This is my task'
        )

        self.second = Task.objects.create(
            archived=True,
            project='Sample project',
            task='Second task'
        )

    def test_get_valid_single_task(self):
        response = client.get(
            reverse('get_delete_update_task', kwargs={'pk': self.first.pk}))
        task = Task.objects.get(pk=self.first.pk)
        serializer = TaskSerializer(task)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_single_task(self):
        response = client.get(
            reverse('get_delete_update_task', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class CreateNewTaskTest(TestCase):
    """ Test module for inserting a new task """

    def setUp(self):
        self.valid_payload = {
            'archived': False,
            'project': 'Sample project',
            'task': 'This is my task'
        }

        self.invalid_payload = {
            'archived': False,
            'project': 'Sample project',
            'task': ''
        }

    def test_create_valid_task(self):
        response = client.post(
            reverse('get_post_tasks'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_task(self):
        response = client.post(
            reverse('get_post_tasks'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class UpdateSingleTaskTest(TestCase):
    """ Test module for updating an existing task record """

    def setUp(self):
        self.first = Task.objects.create(
            archived=False,
            project='Sample project',
            task='This is my task'
        )

        self.second = Task.objects.create(
            archived=True,
            project='Sample project',
            task='Second task'
        )

        self.valid_payload = {
            'archived': False,
            'project': 'Sample project',
            'task': 'This is my task'
        }

        self.invalid_payload = {
            'archived': False,
            'project': 'Sample project',
            'task': ''
        }

    def test_valid_update_task(self):
        response = client.put(
            reverse('get_delete_update_task', kwargs={'pk': self.first.pk}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_update_task(self):
        response = client.put(
            reverse('get_delete_update_task', kwargs={'pk': self.second.pk}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class DeleteSingleTaskTest(TestCase):
    """ Test module for deleting an existing task record """

    def setUp(self):
        self.first = Task.objects.create(
            archived=False,
            project='Sample project',
            task='This is my task'
        )

        self.second = Task.objects.create(
            archived=True,
            project='Sample project',
            task='Second task'
        )

    def test_valid_delete_task(self):
        response = client.delete(
            reverse('get_delete_update_task', kwargs={'pk': self.first.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_invalid_delete_puppy(self):
        response = client.delete(
            reverse('get_delete_update_task', kwargs={'pk': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
