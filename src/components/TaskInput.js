import React from 'react'
import ContentEditable from 'react-contenteditable'

export const TaskInput = ({ task, setTask }) => {
  const contentEditable = React.createRef()

  const pastePlainText = evt => {
    console.log(evt)
    evt.preventDefault()
    const text = evt.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  const disableNewlines = evt => {
    const keyCode = evt.keyCode || evt.which

    if (keyCode === 13) {
      evt.returnValue = false
      if (evt.preventDefault) evt.preventDefault()
    }
  }

  return (
    <ContentEditable
      innerRef={contentEditable}
      html={task}
      disabled={false}
      className='add-task__content'
      aria-label='Enter your task'
      data-testid='add-task-content'
      suppressContentEditableWarning
      onChange={e => { setTask(e.target.value) }}
      onKeyPress={disableNewlines}
      onPaste={pastePlainText}
    />
  )
}
