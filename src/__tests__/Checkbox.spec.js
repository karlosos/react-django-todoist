import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Checkbox } from '../components/Checkbox'
import axios from 'axios'

beforeEach(cleanup) // clean the DOM!

jest.mock('axios')

jest.mock('../context', () => ({
  useSelectedProjectValue: () => ({
    forceUpdateTasks: jest.fn()
  })
}))

describe('<Checkbox />', () => {
  describe('Success', () => {
    it('renders the task checkbox', () => {
      const { queryByTestId } = render(
        <Checkbox id={1} taskDesc='Finish this tutorial series!' />
      )
      expect(queryByTestId('checkbox-action')).toBeTruthy()
    })

    it('renders the task checkbox and accepts a onClick', () => {
      axios.patch.mockImplementation((taskData) => Promise.resolve({}))
      axios.get.mockImplementation(() => Promise.resolve({}))
      const { queryByTestId } = render(
        <Checkbox id={1} taskDesc='Finish this tutorial series!' />
      )
      expect(queryByTestId('checkbox-action')).toBeTruthy()
      fireEvent.click(queryByTestId('checkbox-action'))
    })

    it('renders the task checkbox and accepts a onKeyDown', () => {
      axios.patch.mockImplementation((taskData) => Promise.resolve({}))
      axios.get.mockImplementation(() => Promise.resolve({}))
      const { queryByTestId } = render(
        <Checkbox id={1} taskDesc='Finish this tutorial series!' />
      )
      expect(queryByTestId('checkbox-action')).toBeTruthy()
      fireEvent.keyDown(queryByTestId('checkbox-action'))
    })
  })
})
