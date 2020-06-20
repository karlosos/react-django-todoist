## Use cases

1. Add task
    As a user I want to add task to my task collection. 

    - add task to existing project
    - add task without project

2. Get tasks
    As a user I want to get my task in few views:

    - get tasks for project
    - get tasks with date for today
    - get tasks with date for next week
    - get all tasks 

3. Update tasks
    As a user I want to mark my tasks as archived.

    - updated archive status

4. Create project
    As a user I want to create projects.

    - create project with name

5. Delete project
    As a user I want to delete project

    - delete project with all existing tasks
    - delete project only and delete references in tasks to this project

## Schema - database diagram

[![](https://mermaid.ink/img/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG5cdFRhc2sgPHwtLXw-IFByb2plY3RcbiAgICBUYXNrIDx8LS18PiBVc2VyXG4gICAgUHJvamVjdCA8fC0tfD4gVXNlclxuICAgIGNsYXNzIFRhc2sge1xuICAgICAgICBpbnQgaWRcbiAgICAgICAgYm9vbCBhcmNoaXZlZFxuICAgICAgICB0ZXh0IG5hbWVcbiAgICAgICAgcHJvamVjdFxuICAgICAgICB1c2VyXG4gICAgICAgIGRhdGUgXG4gICAgfVxuXG4gICAgY2xhc3MgUHJvamVjdCB7XG4gICAgICAgIGludCBpZFxuICAgICAgICBjaGFyWzI1NV0gbmFtZVxuICAgICAgICB0YXNrc1xuICAgICAgICB1c2VyXG4gICAgfVxuXG4gICAgY2xhc3MgVXNlciB7XG4gICAgXG4gICAgfVxuXHRcdFx0XHRcdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiY2xhc3NEaWFncmFtXG5cdFRhc2sgPHwtLXw-IFByb2plY3RcbiAgICBUYXNrIDx8LS18PiBVc2VyXG4gICAgUHJvamVjdCA8fC0tfD4gVXNlclxuICAgIGNsYXNzIFRhc2sge1xuICAgICAgICBpbnQgaWRcbiAgICAgICAgYm9vbCBhcmNoaXZlZFxuICAgICAgICB0ZXh0IG5hbWVcbiAgICAgICAgcHJvamVjdFxuICAgICAgICB1c2VyXG4gICAgICAgIGRhdGUgXG4gICAgfVxuXG4gICAgY2xhc3MgUHJvamVjdCB7XG4gICAgICAgIGludCBpZFxuICAgICAgICBjaGFyWzI1NV0gbmFtZVxuICAgICAgICB0YXNrc1xuICAgICAgICB1c2VyXG4gICAgfVxuXG4gICAgY2xhc3MgVXNlciB7XG4gICAgXG4gICAgfVxuXHRcdFx0XHRcdCIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

```
classDiagram
	Task <|--|> Project
    Task <|--|> User
    Project <|--|> User
    class Task {
        int id
        bool archived
        text name
        project
        user
        date 
    }

    class Project {
        int id
        char[255] name
        tasks
        user
    }

    class User {
    
    }
```