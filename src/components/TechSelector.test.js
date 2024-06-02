import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TechSelector from './TechSelector';

test('renders TechSelector and selects a tech', async () => {
  const setTech = jest.fn();
  await act(async () => {
    render(<TechSelector selectedTech="" setTech={setTech} />);
  });

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();

  fireEvent.change(selectElement, { target: { value: 'React' } });
  fireEvent.change(selectElement, { target: { value: 'React' } });
  expect(setTech).toHaveBeenCalledWith('React');
  await new Promise((r) => setTimeout(r, 1000)); // Wait for state update
});
