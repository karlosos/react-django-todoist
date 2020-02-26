import React, { useState, useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { firebase } from '../firebase'
import { DeleteProject } from './DeleteProject'

export const IndividualProject = ({ project, active }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const { projects, setProjects } = useProjectsValue()
  const { setSelectedProject } = useSelectedProjectValue()

  useEffect(() => {
    setShowConfirm(showConfirm && active)
  })

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects])
        setSelectedProject('INBOX')
      })
  }

  return (
    <>
      <div className='project-item' data-testid='project-item'>
        <span className='sidebar__dot'>•</span>
        <span className='sidebar__project-name'>{project.name}</span>

        {!showConfirm &&
          <span
            className='sidebar__project-delete'
            data-testid='delete-project'
            onClick={() => setShowConfirm(!showConfirm)}
            onKeyDown={() => setShowConfirm(!showConfirm)}
            tabIndex={0}
            role='button'
            aria-label='Confirm deletion of project'
          >
            <FaTrashAlt />
          </span>}
      </div>

      {
        showConfirm && active &&
          <DeleteProject
            deleteProject={deleteProject}
            project={project}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
          />
      }
    </>
  )
}

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired
}
