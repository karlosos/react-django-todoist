import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import { App } from '../App'
import axios from 'axios'

beforeEach(cleanup)
jest.mock('axios')

axios.get.mockImplementation((url) => {
  switch (url) {
    case '/api/v1/tasks/':
      return Promise.resolve({ data: [] })
    case '/api/v1/projects/':
      return Promise.resolve({
        data: {
          results: [
            {
              name: '🙌 THE OFFICE',
              id: '1'
            },
            {
              name: '🚀 DAILY',
              id: '2'
            }
          ]
        }
      })
    default:
      return Promise.reject(new Error('not found'))
  }
})

describe('<App />', () => {
  it('renders the application', async () => {
    const { queryByTestId } = render(<App />)
    expect(queryByTestId('application')).toBeTruthy()
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeFalsy()
    await wait()
  })

  it('renders the application using dark mode', async () => {
    const { queryByTestId } = render(<App darkModeDefault />)
    expect(queryByTestId('application')).toBeTruthy()
    expect(
      queryByTestId('application').classList.contains('darkmode')
    ).toBeTruthy()
    await wait()
  })
})
