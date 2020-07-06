import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { Tasks } from '../components/Tasks'
import { useSelectedProjectValue } from '../context'

const tasks = [
  {
    id: 1,
    archived: false,
    date: '21/07/2019',
    project: 1,
    task:
          'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.'
  }
]

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: jest.fn(() => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        id: '1'
      },
      {
        name: '🚀 DAILY',
        id: '2'
      },
      {
        name: '🎯 FUTURE',
        id: '3'
      },
      {
        name: '📚 WORDS',
        id: '4'
      },
      {
        name: '🎵 MUSIC',
        id: '5'
      }
    ]
  }))
}))

beforeEach(cleanup)

describe('<Tasks />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders tasks', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
      tasks: tasks,
      forceUpdateTasks: jest.fn()
    }))

    const { queryByTestId } = render(<Tasks />)
    expect(queryByTestId('tasks')).toBeTruthy()
    expect(queryByTestId('project-name').textContent).toBe('Inbox')
  })

  it('renders a task with a project title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => '1'),
      selectedProject: '1',
      tasks: tasks,
      forceUpdateTasks: jest.fn()
    }))

    const { queryByTestId } = render(<Tasks />)
    expect(queryByTestId('tasks')).toBeTruthy()
    expect(queryByTestId('project-name').textContent).toBe('🙌 THE OFFICE')
  })

  it('renders a task with a collated title', () => {
    useSelectedProjectValue.mockImplementation(() => ({
      setSelectedProject: jest.fn(() => 'INBOX'),
      selectedProject: 'INBOX',
      tasks: tasks,
      forceUpdateTasks: jest.fn()
    }))

    const { queryByTestId } = render(<Tasks />)
    expect(queryByTestId('tasks')).toBeTruthy()
    expect(queryByTestId('project-name').textContent).toBe('Inbox')
  })
})
