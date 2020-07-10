import React, { useState } from 'react'
import { FaRegSun, FaMoon } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { AddTask } from '../AddTask'
import { useSelectedProjectValue } from '../../context'

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)
  const { forceUpdateTasks } = useSelectedProjectValue()

  return (
    <header className='header' data-testid='header'>
      <nav>
        <div className='logo'>
          <img src='static/images/logo.png' alt='Todoist' />
        </div>
        <div className='settings'>
          <ul>
            <li className='settings__add'>
              <button
                data-testid='quick-add-task-action'
                aria-label='Quick add task'
                type='button'
                onClick={() => {
                  setShowQuickAddTask(true)
                  setShouldShowMain(true)
                }}
                onKeyDown={() => {
                  setShowQuickAddTask(true)
                  setShouldShowMain(true)
                }}
              >
                +
              </button>
            </li>
            <li className='settings__darkmode'>
              <button
                data-testid='dark-mode-action'
                aria-label='Darkmode on/off'
                type='button'
                onClick={() => setDarkMode(!darkMode)}
                onKeyDown={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <FaRegSun /> : <FaMoon />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
        forceUpdateTasks={forceUpdateTasks}
      />
    </header>
  )
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired
}
