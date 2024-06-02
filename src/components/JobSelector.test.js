import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobSelector from './JobSelector';

test('renders JobSelector and selects a job', () => {
  const setJob = jest.fn();
  render(<JobSelector selectedJob="" setJob={setJob} />);

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();

  fireEvent.change(selectElement, { target: { value: 'Developer' } });
  expect(setJob).toHaveBeenCalledWith('Developer');
});
