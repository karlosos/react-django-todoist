
<h1 align="center">A simplified todoist clone built with React and Firebase</h1>

<div align="center">Auto formatted with standardjs, tested with jest 🎗</div>

![Tech logos](https://i.imgur.com/4OxMFz0.png)

![App screenshot](https://i.imgur.com/OctvesO.png)

## What is this and who is it for 🤷‍♀️

This was my first project in React that I've built in my spare time. It's meant to be showcase
of my programming skills. 

I've learnt a lot from this project. Some concepts that I've grasped:
- React with hooks
- Javascript fundamentals
- Firebase
- Unit testing with jest

## Features

- Adding and removing tasks
- Tasks categories (projects)
- Dark mode 

## Setting up development environment 🛠

- `git clone https://github.com/oldboyxx/jira_clone.git`
- Create an empty `.env` file in root folder, copy `.env.example` contents into it, and fill in your firebase api keys.
- `npm run install`
- `npm start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

> Currently there's only one user with id: `jlIFXIwyAL3tzHMtzRbw`.

## Testing 🚥

Run tests with: ```npm test -- --coverage```

HTML output will be available in `./coverage` folder.

## Backend WIP ⚙️

### Endpoints to design 📐

- add project - {projectId, name, userId}
- add task - {archived, projectId, task, date, userId}
- update task - {taskId, archived} - generally patch object
- delete project
- get projects - {userId}
- get tasks - {userId}

