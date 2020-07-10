import React, { useState } from 'react'
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa'
import moment from 'moment'
import PropTypes from 'prop-types'
import { useSelectedProjectValue } from '../context'
import { ProjectOverlay } from './ProjectOverlay'
import { TaskDate } from './TaskDate'
import { TaskInput } from './TaskInput'
import axios from 'axios'

export const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
  forceUpdateTasks
}) => {
  const [task, setTask] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [project, setProject] = useState('')
  const [showMain, setShowMain] = useState(shouldShowMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)

  const { selectedProject } = useSelectedProjectValue()

  const addTask = () => {
    let projectId = project || selectedProject
    let collatedDate = ''

    if (projectId === 'TODAY') {
      collatedDate = moment().format('YYYY-MM-DD')
      projectId = ''
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment()
        .add(7, 'days')
        .format('YYYY-MM-DD')
      projectId = ''
    } else if (projectId === 'INBOX') {
      projectId = ''
    }

    if (task) {
      const taskData = {}
      taskData.task = task
      taskData.archived = false
      if (projectId) {
        taskData.project = projectId
      }
      if (collatedDate || taskDate) {
        taskData.date = collatedDate || taskDate
      }

      axios.post('/api/v1/tasks/', taskData)
        .then(res => {
          forceUpdateTasks()
          setTask('')
          setProject('')
          setShowMain('')
          setShowProjectOverlay(false)
          setShowTaskDate(false)
          setShowQuickAddTask(false)
        })
        .catch(err => {
          setTask('')
          setProject('')
          setShowMain('')
          setShowProjectOverlay(false)
          setShowTaskDate(false)
          console.log(err)
        })
    }
  }

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid='add-task-comp'
    >
      {showAddTaskMain && (
        <div
          className='add-task__shallow'
          data-testid='show-main-action'
          onClick={() => setShowMain(!showMain)}
          onKeyDown={() => setShowMain(!showMain)}
          tabIndex={0}
          aria-label='Add task'
          role='button'
        >
          <span className='add-task__plus'>+</span>
          <span className='add-task__text'>Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className='add-task__main' data-testid='add-task-main'>
          {showQuickAddTask && (
            <>
              <div data-testid='quick-add-task'>
                <h2 className='header'>Quick Add Task</h2>
                <span
                  className='add-task__cancel-x'
                  data-testid='add-task-quick-cancel'
                  aria-label='Cancel adding task'
                  onClick={() => {
                    setShowMain(false)
                    setShowProjectOverlay(false)
                    setShowQuickAddTask(false)
                  }}
                  onKeyDown={() => {
                    setShowMain(false)
                    setShowProjectOverlay(false)
                    setShowQuickAddTask(false)
                  }}
                  tabIndex={0}
                  role='button'
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <TaskInput task={task} setTask={setTask} />
          <button
            type='button'
            className='add-task__submit'
            data-testid='add-task'
            onClick={() =>
              showQuickAddTask
                ? addTask() && setShowQuickAddTask(false)
                : addTask()}
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className='add-task__cancel'
              data-testid='add-task-main-cancel'
              onClick={() => {
                setShowMain(false)
                setShowProjectOverlay(false)
              }}
              onKeyDown={() => {
                setShowMain(false)
                setShowProjectOverlay(false)
              }}
              aria-label='Cancel adding a task'
              tabIndex={0}
              role='button'
            >
              Cancel
            </span>
          )}
          <span
            className='add-task__project'
            data-testid='show-project-overlay'
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
            tabIndex={0}
            role='button'
          >
            <FaRegListAlt />
          </span>
          <span
            className='add-task__date'
            data-testid='show-task-date-overlay'
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}
            tabIndex={0}
            role='button'
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  )
}

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func
}
