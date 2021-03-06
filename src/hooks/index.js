import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])
  const [updateTasks, setUpdateTasks] = useState([])
  const forceUpdateTasks = useCallback(() => setUpdateTasks({}), [])

  useEffect(() => {
    const requestParams = selectedProject && selectedProject !== 'INBOX'
      ? { filter: selectedProject } : {}

    axios.get('/api/v1/tasks/', {
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
  }, [selectedProject, updateTasks])

  return { tasks, archivedTasks, forceUpdateTasks }
}

export const useProjects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('/api/v1/projects/')
      .then(res => {
        const resultProjects = res.data.results
        if (JSON.stringify(resultProjects) !== JSON.stringify(projects)) { setProjects(resultProjects) }
      })
      .catch(err => {
        if (JSON.stringify([]) !== JSON.stringify(projects)) { setProjects([]) }
        console.log(err)
      })
  }, [projects])

  return { projects, setProjects }
}
