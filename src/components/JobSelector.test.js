import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobSelector from './JobSelector';

test('renders JobSelector and selects a job', async () => {
  const setJob = jest.fn();
  await act(async () => {
    render(<JobSelector selectedJob="" setJob={setJob} />);
  });

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();

  fireEvent.change(selectElement, { target: { value: 'Developer' } });
  fireEvent.change(selectElement, { target: { value: 'Developer' } });
  expect(setJob).toHaveBeenCalledWith('Developer');
  await new Promise((r) => setTimeout(r, 1000)); // Wait for state update
});
