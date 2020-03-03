import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { TaskInput } from '../components/TaskInput'

describe('<TaskInput />', () => {
  it('paste should change task', async () => {
    let task = ''
    const setTask = x => task = x
    const { queryByTestId } = render(
      <TaskInput task={task} setTask={setTask} />
    )
    expect(queryByTestId('add-task-content')).toBeTruthy()
    // todo add fireEvent.paste
  })
})
