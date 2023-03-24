import React from 'react'
import { render, cleanup, fireEvent, wait, within, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { AddProject } from '../components/AddProject'
import axios from 'axios'

jest.mock('axios')

jest.mock('../context', () => ({
  useSelectedProjectValue: jest.fn(),
  useProjectsValue: () => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott'
      },
      {
        name: '🚀 DAILY',
        projectId: '2',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'daily-office'
      },
      {
        name: '🎯 FUTURE',
        projectId: '3',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'wake-up'
      },
      {
        name: '📚 WORDS',
        projectId: '4',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'arcade-fire'
      },
      {
        name: '🎵 MUSIC',
        projectId: '5',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'bella-ciao'
      }
    ],
    setProjects: jest.fn()
  })
}))

beforeEach(cleanup)

describe('<AddProject />', () => {
  describe('Success', () => {
    it('renders <AddProject />', () => {
      const { queryByTestId } = render(<AddProject shouldShow />)
      expect(queryByTestId('add-project')).toBeTruthy()
    })

    it('renders <AddProject /> and adds a project using onClick', async () => {
      axios.post.mockImplementation((projectData) => Promise.resolve({}))

      const { queryByTestId } = render(<AddProject shouldShow />)
      expect(queryByTestId('add-project')).toBeTruthy()

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world!' }
      })
      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world!'
      )
      fireEvent.click(queryByTestId('add-project-submit'))
      await waitForElementToBeRemoved(() => screen.getByTestId('project-name'));
    })

    it('renders <AddProject /> and adds a project using onKeyDown', () => {
      const { queryByTestId } = render(<AddProject shouldShow />)
      expect(queryByTestId('add-project')).toBeTruthy()

      fireEvent.change(queryByTestId('project-name'), {
        target: { value: 'Best project in the world!' }
      })
      expect(queryByTestId('project-name').value).toBe(
        'Best project in the world!'
      )
      fireEvent.keyDown(queryByTestId('add-project-submit'))
    })

    it('hides the project overlay when cancelled using onClick', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />)
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeTruthy()

      fireEvent.click(getByText('Cancel'))
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeFalsy()
    })

    it('hides the project overlay when cancelled onKeydown', () => {
      const { queryByTestId, getByText } = render(<AddProject shouldShow />)
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeTruthy()

      fireEvent.keyDown(getByText('Cancel'))
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeFalsy()
    })

    it('hides the project overlay using onClick singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />)
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeTruthy()

      fireEvent.click(queryByTestId('add-project-action'))
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeFalsy()
    })

    it('hides the project overlay using onKeyDown singular and reverse action', () => {
      const { queryByTestId } = render(<AddProject shouldShow />)
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('add-project-action'))
      expect(queryByTestId('add-project')).toBeTruthy()
      expect(queryByTestId('add-project-inner')).toBeFalsy()
    })
  })
})
