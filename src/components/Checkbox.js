import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useSelectedProjectValue } from '../context'

export const Checkbox = ({ id, taskDesc }) => {
  const { forceUpdateTasks } = useSelectedProjectValue()

  const archiveTask = () => {
    const taskData = {
      archived: true
    }

    axios.patch('/api/v1/tasks/' + id + '/', taskData)
      .then(res => {
        forceUpdateTasks()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div
      className='checkbox-holder'
      data-testid='checkbox-action'
      onClick={() => archiveTask()}
      onKeyDown={() => archiveTask()}
      aria-label={`Mark ${taskDesc} as done?`}
      role='button'
      tabIndex={0}
    >
      <span className='checkbox' />
    </div>
  )
}

Checkbox.propTypes = {
  id: PropTypes.number.isRequired,
  taskDesc: PropTypes.string.isRequired
}
