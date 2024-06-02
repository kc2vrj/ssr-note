import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TechSelector from './TechSelector';

test('renders TechSelector and selects a tech', () => {
  const setTech = jest.fn();
  render(<TechSelector selectedTech="" setTech={setTech} />);

  const selectElement = screen.getByRole('combobox');
  expect(selectElement).toBeInTheDocument();

  fireEvent.change(selectElement, { target: { value: 'React' } });
  expect(setTech).toHaveBeenCalledWith('React');
});