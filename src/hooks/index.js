import { useState, useEffect } from 'react'
import axios from 'axios'

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])

  const updateTasks = () => {
    const requestParams = selectedProject && selectedProject !== 'INBOX'
      ? { filter: selectedProject } : {}

    axios.get('http://127.0.0.1:8000/api/v1/tasks/', {
      params: requestParams
    })
      .then(res => {
        const tasks = res.data
        setTasks(tasks.filter(task => task.archived === false))
        setArchivedTasks(tasks.filter(task => task.archived === true))
      })
      .catch(err => {
        setTasks([])
        setArchivedTasks([])
        console.log(err)
      })
  }

  useEffect(() => {
    updateTasks()
  }, [selectedProject])

  return { tasks, archivedTasks, updateTasks }
}

export const useProjects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/projects/')
      .then(res => {
        const resultProjects = res.data.results
        if (JSON.stringify(resultProjects) !== JSON.stringify(projects)) { setProjects(resultProjects) }
        console.log(resultProjects)
      })
      .catch(err => {
        if (JSON.stringify([]) !== JSON.stringify(projects)) { setProjects([]) }
        console.log(err)
      })
  }, [projects])

  return { projects, setProjects }
}
