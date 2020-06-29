import json
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from ..models import Task, Project
from ..serializers import TaskSerializer, ProjectSerializer


# initialize the APIClient app
client = APIClient()


class TaskViewSetTestCase(APITestCase):
    """ Test tasks viewset """

    def setUp(self):
        self.project1 = Project.objects.create(
            name="This is project"
        )

        self.task1 = Task.objects.create(
            archived=False,
            project=self.project1,
            task='This is my task'
        )

        self.task2 = Task.objects.create(
            archived=True,
            # project='Sample project',
            task='Second task'
        )

    def test_task_list(self):
        # get API response
        response = client.get('/api/v1/tasks/')
        # get data from db
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        tasks_len_from_response = len(json.loads(response.content)['results'])
        tasks_len_from_object = len(serializer.data)
        self.assertEqual(tasks_len_from_response, tasks_len_from_object)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_task_create(self):
        # Remember how many tasks existed before adding new task
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        tasks_len_before = len(serializer.data)

        # Test creating task
        data = {'task': 'This is new task'}
        response = client.post('/api/v1/tasks/', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check if task has been added
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        tasks_len_after = len(serializer.data)
        self.assertEqual(tasks_len_before + 1, tasks_len_after)

    def test_task_retrieve(self):
        response = client.get('/api/v1/tasks/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        task_serializer_data = TaskSerializer(instance=self.task1).data
        self.assertEqual(task_serializer_data, response.data)

    def test_task_update(self):
        name_before = self.task1.task
        response = client.put('/api/v1/tasks/1/', {'task': 'new name'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        name_after = Task.objects.get(id=1).task
        self.assertEqual(name_after, 'new name')
        self.assertNotEqual(name_before, name_after)

    def test_task_partial_update(self):
        name_before = self.task2.task
        response = client.patch('/api/v1/tasks/2/', {'task': 'new name'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        name_after = Task.objects.get(id=2).task
        self.assertEqual(name_after, 'new name')
        self.assertNotEqual(name_before, name_after)

    def test_task_delete(self):
        response = client.delete('/api/v1/tasks/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class ProjectViewSetTestCase(APITestCase):
    """ Test project viewset """

    def setUp(self):
        self.project1 = Project.objects.create(
            name="This is project"
        )
        self.project2 = Project.objects.create(
            name="This is another one"
        )

    def test_project_list(self):
        response = client.get('/api/v1/projects/')
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        projects_len_from_response = len(json.loads(response.content)['results'])
        projects_len_from_object = len(serializer.data)
        self.assertEqual(projects_len_from_response, projects_len_from_object)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_project_create(self):
        # Remember how many projects existed before adding new project
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        projects_len_before = len(serializer.data)

        # Test creating task
        data = {'name': 'This is new project'}
        response = client.post('/api/v1/projects/', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check if task has been added
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        projects_len_after = len(serializer.data)
        self.assertEqual(projects_len_before + 1, projects_len_after)

    def test_project_retrieve(self):
        response = client.get('/api/v1/projects/1/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project_serializer_data = ProjectSerializer(instance=self.project1).data
        self.assertEqual(project_serializer_data, response.data)

    def test_project_update(self):
        name_before = self.project1.name
        response = client.put('/api/v1/projects/1/', {'name': 'new name'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        name_after = Project.objects.get(id=1).name
        self.assertEqual(name_after, 'new name')
        self.assertNotEqual(name_before, name_after)

    def test_project_partial_update(self):
        name_before = self.project1.name
        response = client.patch('/api/v1/projects/1/', {'name': 'new name'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        name_after = Project.objects.get(id=1).name
        self.assertEqual(name_after, 'new name')
        self.assertNotEqual(name_before, name_after)

    def test_project_delete(self):
        response = client.delete('/api/v1/projects/1/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
