import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Projects } from '../components/Projects'

beforeEach(cleanup) // thanks!

jest.mock('../context', () => ({
  useSelectedProjectValue: () => ({
    setSelectedProject: () => 'INBOX',
  }),
  useProjectsValue: () => ({
    projects: [
      {
        name: '🙌 THE OFFICE',
        id: '1',
      },
    ],
  }),
}))

describe('<ProjectOverlay', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Success', () => {
    it('renders the projects', () => {
      const { queryByTestId } = render(<Projects />)
      expect(queryByTestId('project-action')).toBeTruthy()
    })

    it('renders the projects and selects an active project using onClick', () => {
      const active = '1'
      const setActive = jest.fn()
      const { queryByTestId } = render(
        <Projects active={active} setActive={setActive} />
      )
      expect(queryByTestId('project-action')).toBeTruthy()

      fireEvent.click(queryByTestId('project-action'))
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy()
    })

    it('renders the projects and selects an active project using onKeyDown', () => {
      const active = '1'
      const setActive = jest.fn()
      const { queryByTestId } = render(
        <Projects active={active} setActive={setActive} />
      )
      expect(queryByTestId('project-action')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('project-action'))
      expect(
        queryByTestId('project-action-parent').classList.contains('active')
      ).toBeTruthy()
    })

    it('renders the projects with no active value', () => {
      const active = 'inbox'
      const setActive = jest.fn()
      const { queryByTestId } = render(
        <Projects active={active} setActive={setActive} />
      )
      expect(queryByTestId('project-action')).toBeTruthy()

      fireEvent.keyDown(queryByTestId('project-action'))
      expect(
        queryByTestId('project-action-parent').classList.contains(
          'sidebar__project'
        )
      ).toBeTruthy()
    })
  })
})
