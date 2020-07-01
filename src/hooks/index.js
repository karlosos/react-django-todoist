import { useState, useEffect } from 'react'
import { firebase } from '../firebase'
import axios from 'axios'

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])

  useEffect(() => {
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
  }, [selectedProject])

  return { tasks, archivedTasks }
}

export const useProjects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }))

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects)
        }
      })
  }, [projects])

  return { projects, setProjects }
}
