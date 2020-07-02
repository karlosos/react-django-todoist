import React from 'react'
import PropTypes from 'prop-types'
import { useSelectedProjectValue, useProjectsValue } from '../context'
import { IndividualProject } from './IndividualProject'

export const Projects = ({ active, setActive }) => {
  const { setSelectedProject } = useSelectedProjectValue()
  const { projects } = useProjectsValue()

  return (
    projects &&
    projects.map(project => (
      <li
        key={project.id}
        data-testid='project-action-parent'
        data-doc-id={project.docId}
        className={
          active === project.id
            ? 'active sidebar__project'
            : 'sidebar__project'
        }
      >
        <div
          className='project-action'
          role='button'
          data-testid='project-action'
          tabIndex={0}
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.id)
            setSelectedProject(project.id)
          }}
          onKeyDown={() => {
            setActive(project.id)
            setSelectedProject(project.id)
          }}
        >
          <IndividualProject project={project} active={active === project.id} />
        </div>
      </li>
    ))
  )
}

Projects.propTypes = {
  activeValue: PropTypes.bool
}
