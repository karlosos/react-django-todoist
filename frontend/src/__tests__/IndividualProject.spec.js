import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { IndividualProject } from '../components/IndividualProject'
import axios from 'axios'

jest.mock('axios')

jest.mock('../context', () => ({
  useSelectedProjectValue: () => ({
    setSelectedProject: () => 'INBOX',
  }),
  useProjectsValue: () => ({
    setProjects: jest.fn(),
    projects: [
      {
        name: '🙌 THE OFFICE',
        projectId: '1',
        userId: 'jlIFXIwyAL3tzHMtzRbw',
        docId: 'michael-scott'
      }
    ]
  })
}))

describe('<IndividualProject />', () => {
  const project = {
    name: '🙌 THE OFFICE',
    projectId: '1',
    userId: 'jlIFXIwyAL3tzHMtzRbw',
    docId: 'michael-scott'
  }

  describe('Success', () => {
    it('renders our project', () => {
      const { getByText } = render(<IndividualProject project={project} />)
      expect(getByText('🙌 THE OFFICE')).toBeTruthy()
    })

    it('renders the delete overlay and then deletes a project using onClick', () => {
      axios.delete.mockResolvedValueOnce(undefined)
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} active />
      )

      fireEvent.click(queryByTestId('delete-project'))
      expect(
        getByText('Are you sure you want to delete this project?')
      ).toBeTruthy()

      fireEvent.click(getByText('Delete'))
    })

    it('renders the delete overlay and then cancels using onClick', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} active />
      )

      fireEvent.click(queryByTestId('delete-project'))
      expect(
        getByText('Are you sure you want to delete this project?')
      ).toBeTruthy()

      fireEvent.click(getByText('Cancel'))
    })

    it('renders the delete overlay and then cancels using onKeyDown', () => {
      const { queryByTestId, getByText } = render(
        <IndividualProject project={project} active />
      )

      fireEvent.keyDown(queryByTestId('delete-project'))
      expect(
        getByText('Are you sure you want to delete this project?')
      ).toBeTruthy()

      fireEvent.keyDown(getByText('Cancel'))
    })
  })
})
