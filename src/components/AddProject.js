import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useProjectsValue } from '../context'
import axios from 'axios'

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow)
  const [projectName, setProjectName] = useState('')

  const { projects, setProjects } = useProjectsValue()

  const addProject = () =>
    projectName &&
    axios.post('http://127.0.0.1:8000/api/v1/projects/', { name: projectName })
      .then(res => {
        setProjects([...projects])
        setProjectName('')
        setShow(false)
      })
      .catch(err => {
        console.log(err)
      })

  return (
    <div className='add-project' data-testid='add-project'>
      {show && (
        <div className='add-project__input' data-testid='add-project-inner'>
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className='add-project__name'
            data-testid='project-name'
            type='text'
            placeholder='Name your project'
          />
          <button
            className='add-project__submit'
            type='button'
            onClick={() => addProject()}
            data-testid='add-project-submit'
          >
            Add Project
          </button>
          <span
            aria-label='Cancel adding project'
            data-testid='hide-project-overlay'
            className='add-project__cancel'
            onClick={() => setShow(false)}
            onKeyDown={() => setShow(false)}
            role='button'
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className='add-project__plus'>+</span>
      <span
        aria-label='Add Project'
        data-testid='add-project-action'
        className='add-project__text'
        onClick={() => setShow(!show)}
        onKeyDown={() => setShow(!show)}
        role='button'
        tabIndex={0}
      >
        Add Project
      </span>
    </div>
  )
}

AddProject.propTypes = {
  shouldShow: PropTypes.bool
}
