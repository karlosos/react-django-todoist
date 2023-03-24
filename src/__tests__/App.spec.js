import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '../App'
import axios from 'axios'

jest.mock('axios')

describe('<App />', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      switch (url) {
        case '/api/v1/tasks/':
          return Promise.resolve({
            data: [
              {
                id: 1,
                archived: false,
                date: '21/07/2019',
                project: 1,
                task: 'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
              },
            ],
          })
        case '/api/v1/projects/':
          return Promise.resolve({
            data: {
              results: [
                {
                  name: '🙌 THE OFFICE',
                  id: '1',
                },
                {
                  name: '🚀 DAILY',
                  id: '2',
                },
              ],
            },
          })
        default:
          return Promise.reject(new Error('not found'))
      }
    })
  })

  it('renders the application', async () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId('application')).toBeTruthy()
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeFalsy()

    await screen.findByText('Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.');
  })

  it('renders the application using dark mode', async () => {
    const { queryByTestId } = render(<App darkModeDefault />)
    expect(queryByTestId('application')).toBeTruthy()
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy()

    await screen.findByText('Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.');
  })
})
