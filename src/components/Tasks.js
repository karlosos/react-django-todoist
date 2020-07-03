import React, { useEffect } from 'react'
import { Checkbox } from './Checkbox'
import { AddTask } from './AddTask'
import { useTasks } from '../hooks'
import { collatedTasks } from '../constants'
import { getTitle, getCollatedTitle, collatedTasksExist } from '../helpers'
import { useSelectedProjectValue, useProjectsValue } from '../context'

export const Tasks = () => {
  const { selectedProject } = useSelectedProjectValue()
  const { projects } = useProjectsValue()
  const { tasks, forceUpdateTasks } = useTasks(selectedProject)

  let projectName = ''

  if (projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`
  })

  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>

      <ul className='tasks__list'>
        {tasks.map(task => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask forceUpdateTasks={forceUpdateTasks} />
    </div>
  )
}
