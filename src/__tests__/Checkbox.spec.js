import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Checkbox } from '../components/Chechbox';

beforeEach(cleanup); // clean the DOM!

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    update: jest.fn()
                })),
            })),
        })),
    },
}));

describe('<Checkbox />', () => {
    describe('Success', () => {
        it('render the task checkbox', () => {
            const { queryByTestId } = render(
                <Checkbox id="1" taskDesc="Finish"/>
            );
            expect(queryByTestId('checkbox-action')).toBeTruthy();
        });

        it('should render the task checkbox and accepts a click', () => {
            const { queryByTestId } = render(
                <Checkbox id="1" taskDesc="Finish"/>
            );
            expect(queryByTestId('checkbox-action')).toBeTruthy();
            fireEvent.click(queryByTestId('checkbox-action'));
        });

        it('should render the task checkbox and accepts key down', () => {
            const { queryByTestId } = render(
                <Checkbox id="1" taskDesc="Finish"/>
            );
            expect(queryByTestId('checkbox-action')).toBeTruthy();
            fireEvent.keyDown(queryByTestId('checkbox-action'));
        });

    });
})
