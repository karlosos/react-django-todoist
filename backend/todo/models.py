from django.db import models


class Project(models.Model):
    """
    Project Model
    Defines the attributes of a project
    """
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    """
    Task Model
    Defines the attributes of a task
    """
    archived = models.BooleanField(default=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True)
    task = models.TextField()
    date = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.task
