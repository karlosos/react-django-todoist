from django.db import models


class Task(models.Model):
    """
    Task Model
    Defines the attributes of a task
    """
    archived = models.BooleanField(default=False)
    project = models.CharField(max_length=255)
    task = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self):
        return 'Task \"' + self.task + '\" is added.'
