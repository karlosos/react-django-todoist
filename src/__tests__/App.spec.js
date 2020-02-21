import React from 'react'
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup); // clean the DOM!

describe('<App />', () => {
    test('renders the application', () => {
        const {queryByTestId, debug } = render(<App />);
        expect(queryByTestId('application')).toBeTruthy();
        expect(queryByTestId('application').classList.contains('darkmode'))
        .toBeFalsy();
    });

    test('renders the application using dark mode', () => {
        const {queryByTestId, debug } = render(<App darkModeDefault />);
        expect(queryByTestId('application')).toBeTruthy();
        expect(queryByTestId('application').classList.contains('darkmode'))
            .toBeTruthy();
    })  
})
