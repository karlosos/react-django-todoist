import React from 'react'
import { render, fireEvent, cleanup, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react'
import { AddTask } from '../components/AddTask'
import { useSelectedProjectValue } from '../context'
import axios from 'axios'

beforeEach(cleanup)

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: () => ({ projects: [] }),
}))

jest.mock('axios')

describe('<AddTask />', () => {
  beforeEach(() => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: '1',
      tasks: [],
      forceUpdateTasks: jest.fn(),
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the <AddTask />', () => {
      const { queryByTestId } = render(<AddTask />)
      expect(queryByTestId('add-task-comp')).toBeTruthy()
    })

    it('renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn()
      const forceUpdateTasks = jest.fn()

      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
          forceUpdateTasks={forceUpdateTasks}
        />
      )

      expect(queryByTestId('quick-add-task')).toBeTruthy()
    })

    it('renders the <AddTask /> main showable using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('renders the <AddTask /> main showable using keyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()
    })

    it('renders the <AddTask /> project overlay when using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.click(queryByTestId('show-project-overlay'))
      expect(queryByTestId('project-overlay')).toBeTruthy()
    })

    it('renders the <AddTask /> project overlay when using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('show-project-overlay'))
      expect(queryByTestId('project-overlay')).toBeTruthy()
    })

    it('renders the <AddTask /> task date overlay when using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()
    })

    it('renders the <AddTask /> task date overlay when using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()
    })

    it('hides the <AddTask /> main when cancel is clicked using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.click(queryByTestId('add-task-main-cancel'))
      expect(queryByTestId('add-task-main')).toBeFalsy()
    })

    it('hides the <AddTask /> main when cancel is clicked using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />)

      fireEvent.keyDown(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'))
      expect(queryByTestId('add-task-main')).toBeFalsy()
    })

    it('renders <AddTask /> for quick add task and then clicks cancel using onClick', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )

      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.click(queryByTestId('add-task-quick-cancel'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    it('renders <AddTask /> for quick add task and then clicks cancel using onKeyDown', () => {
      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      )

      fireEvent.keyDown(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-task-quick-cancel'))
      expect(setShowQuickAddTask).toHaveBeenCalled()
    })

    it('renders <AddTask /> and adds a task to TODAY', async () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'TODAY',
      }))
      axios.post.mockImplementation((taskData) => Promise.resolve({}))

      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const forceUpdateTasks = jest.fn()
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
          forceUpdateTasks={forceUpdateTasks}
        />
      )
      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()

      fireEvent.input(queryByTestId('add-task-content'), {
        target: { innerHTML: 'I am a new task and I am amazing!' },
      })
      expect(queryByTestId('add-task-content').innerHTML).toBe(
        'I am a new task and I am amazing!'
      )

      fireEvent.click(queryByTestId('add-task'))
      await waitFor(() => expect(setShowQuickAddTask).toHaveBeenCalled())
    })

    it('renders <AddTask /> and adds a task to NEXT_7', async () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: 'NEXT_7',
      }))
      axios.post.mockImplementation((taskData) => Promise.resolve({}))

      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const forceUpdateTasks = jest.fn()
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
          forceUpdateTasks={forceUpdateTasks}
        />
      )
      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()

      fireEvent.input(queryByTestId('add-task-content'), {
        target: { innerHTML: 'I am a new task and I am amazing!' },
      })
      expect(queryByTestId('add-task-content').innerHTML).toBe(
        'I am a new task and I am amazing!'
      )

      fireEvent.click(queryByTestId('add-task'))
      await waitFor(() => expect(setShowQuickAddTask).toHaveBeenCalled())
    })

    it('renders <AddTask /> and adds a task with a task date of TODAY', async () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }))
      axios.post.mockImplementation((taskData) => Promise.resolve({}))

      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const forceUpdateTasks = jest.fn()
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
          forceUpdateTasks={forceUpdateTasks}
        />
      )
      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.input(queryByTestId('add-task-content'), {
        target: { innerHTML: 'I am a new task and I am amazing!' },
      })
      expect(queryByTestId('add-task-content').innerHTML).toBe(
        'I am a new task and I am amazing!'
      )

      fireEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.click(queryByTestId('task-date-today'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      fireEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('task-date-today'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      fireEvent.click(queryByTestId('add-task'))
      await waitFor(() => expect(queryByTestId('add-task-content').innerHTML).toBe(
        ''
      ))
    })

    it('renders <AddTask /> and adds a task with a task date of TOMORROW', async () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }))
      axios.post.mockImplementation((taskData) => Promise.resolve({}))

      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const forceUpdateTasks = jest.fn()
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
          forceUpdateTasks={forceUpdateTasks}
        />
      )
      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.input(queryByTestId('add-task-content'), {
        target: { innerHTML: 'I am a new task and I am amazing!' },
      })
      expect(queryByTestId('add-task-content').innerHTML).toBe(
        'I am a new task and I am amazing!'
      )

      fireEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.click(queryByTestId('task-date-tomorrow'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      fireEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('task-date-tomorrow'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      fireEvent.click(queryByTestId('add-task'))
      await waitFor(() => expect(queryByTestId('add-task-content').innerHTML).toBe(
        ''
      ))
    })

    it('renders <AddTask /> and adds a task with a task date of NEXT_7', async () => {
      useSelectedProjectValue.mockImplementation(() => ({
        selectedProject: '1',
      }))
      axios.post.mockImplementation((taskData) => Promise.resolve({}))

      const showQuickAddTask = true
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
      const forceUpdateTasks = jest.fn()
      const { queryByTestId } = render(
        <AddTask
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
          forceUpdateTasks={forceUpdateTasks}
        />
      )
      // const forceUpdateTasks = jest.fn()
      // const { queryByTestId } = render(<AddTask showMain forceUpdateTasks={forceUpdateTasks} />)
      fireEvent.click(queryByTestId('show-main-action'))
      expect(queryByTestId('add-task-content')).toBeTruthy()
      expect(queryByTestId('add-task-main')).toBeTruthy()

      fireEvent.input(queryByTestId('add-task-content'), {
        target: { innerHTML: 'I am a new task and I am amazing!' },
      })
      expect(queryByTestId('add-task-content').innerHTML).toBe(
        'I am a new task and I am amazing!'
      )

      fireEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.click(queryByTestId('task-date-next-week'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      fireEvent.click(queryByTestId('show-task-date-overlay'))
      expect(queryByTestId('task-date-overlay')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('task-date-next-week'))
      expect(queryByTestId('task-date-overlay')).toBeFalsy()

      fireEvent.click(queryByTestId('add-task'))
      await waitFor(() => expect(queryByTestId('add-task-content').innerHTML).toBe(
        ''
      ))
    })
  })

  it('renders <AddTask />, typin enter should do nothing, then adds a task to TODAY', async () => {
    useSelectedProjectValue.mockImplementation(() => ({
      selectedProject: 'TODAY',
    }))
    axios.post.mockImplementation((taskData) => Promise.resolve({}))

    const showQuickAddTask = true
    const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
    const forceUpdateTasks = jest.fn()
    const { queryByTestId } = render(
      <AddTask
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
        forceUpdateTasks={forceUpdateTasks}
      />
    )
    fireEvent.click(queryByTestId('show-main-action'))
    expect(queryByTestId('add-task-content')).toBeTruthy()

    fireEvent.input(queryByTestId('add-task-content'), {
      target: { innerHTML: 'I am a new task and I am amazing!' },
    })
    expect(queryByTestId('add-task-content').innerHTML).toBe(
      'I am a new task and I am amazing!'
    )

    queryByTestId('add-task-content').focus()
    // fireEvent.keyPress(document.activeElement || document.body, { key: 'A', code: 'KeyA', keyCode: 13 })
    // fireEvent.keyDown(document.activeElement || document.body, { key: 'A', code: 'KeyA', keyCode: 13 })
    // fireEvent.keyUp(document.activeElement || document.body, { key: 'A', code: 'KeyA', keyCode: 13 })

    // fireEvent.keyPress(document.activeElement || document.body, { key: 'Enter', code: 'Enter', keyCode: 65 })
    // fireEvent.keyDown(document.activeElement || document.body, { key: 'Enter', code: 'Enter', keyCode: 65 })
    // fireEvent.keyUp(document.activeElement || document.body, { key: 'Enter', code: 'Enter', keyCode: 65 })
    // TODO: update this later when user-event will implement this
    // https://github.com/testing-library/user-event/pull/235
    // https://github.com/testing-library/react-testing-library/issues/680

    fireEvent.click(queryByTestId('add-task'))
    await waitFor(() => expect(setShowQuickAddTask).toHaveBeenCalled())
  })
})
