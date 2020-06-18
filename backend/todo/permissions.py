from rest_framework.permissions import BasePermission


class UserIsOwnerProject(BasePermission):

    def has_object_permission(self, request, view, project):
        return request.user.id == project.user.id
