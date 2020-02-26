import React from 'react'

export const DeleteProject = (props) => {
  return (
    <div className='project-delete-modal'>
      <div className='project-delete-modal__inner'>
        <p>Are you sure you want to delete this project?</p>
        <button
          type='button'
          onClick={() => props.deleteProject(props.project.docId)}
        >
              Delete
        </button>
        <span
          onClick={() => props.setShowConfirm(!props.showConfirm)}
          onKeyDown={() => props.setShowConfirm(!props.showConfirm)}
          tabIndex={0}
          role='button'
          aria-label='Cancel adding project, do not delete'
        >
              Cancel
        </span>
      </div>
    </div>
  )
}
