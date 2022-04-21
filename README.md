
<h1 align="center">A simplified todoist clone built with React and Django</h1>

<div align="center">Auto formatted with standardjs, tested with jest 🎗</div>

![Tech logos](https://i.imgur.com/s457QRL.png)

![App screenshot](https://i.imgur.com/OctvesO.png)

## What is this and who is it for 🤷‍♀️

This was my first project in React that I've built in my spare time. React app is based on [tutorial](https://www.youtube.com/watch?v=hT3j87FMR6M). Backend was created by me without any help or tutorial. Github Actions (CI) were also done by me alone. 

> ⚠️ Do not analyse React code as it was not written by me. This was one of the first tutorial projects I did for learning React. I made it public only for archiving reasons and because there are some additional things built over the tutorial base.

I've learnt a lot from this project. Some concepts that I've grasped:
- React with hooks (tutorial scope)
- Javascript fundamentals (tutorial scope)
- Firebase (tutorial scope)
- Javascript unit testing with jest (tutorial scope)
- Django Rest Framework ✅
- Unit testing Django ✅
- Swagger documentation ✅
- Github Actions (CI) ✅

## Features

- Adding and removing tasks
- Tasks categories (projects)
- Dark mode
- Backend REST API endpoints (`/api/v1/`)
- Documentation of endpoints in swagger (`/documentation/`)

## Setting up development environment 🛠

### Backend
- `git clone https://github.com/karlosos/react-todoist/`
- `virtualenv .venv`
- `.venv\Scripts\activate` or `source .venv/bin/activate`
- `pip install -r requirements.txt`
- `python manage.py migrate`
- `python manage.py createsuperuser --email admin@example.com --username admin`
- `python manage.py runserver`
- Open [http://127.0.0.1:8000/api/v1/](http://127.0.0.1:8000/api/v1/) or [http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/) to view documentation.

### Frontend
- `npm run install`
- `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


## Testing 🚥

Run frontend tests with: ```npm test -- --coverage```

HTML output will be available in `./coverage` folder.

Run backend tests with: ```python manage.py test```


### Deploy 🚀

Create **heroku** application. 

```
$ heroku create todo-react-drf 
```

Add `nodejs` and `python` buildpacks and the `postgresql` addon to app:

```
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku buildpacks:add --index 2 heroku/python
$ heroku addons:create heroku-postgresql:hobby-dev
```

Set variable:

```
heroku config:set HEROKU=yes -a todo-react-drf
```

Push repository to **heroku**:

```
$ git push heroku master
```
