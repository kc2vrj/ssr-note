import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminPage from './AdminPage';

test('renders AdminPage and adds a tech', () => {
  render(<AdminPage />);

  const inputElement = screen.getAllByRole('textbox')[0];
  expect(inputElement).toBeInTheDocument();

  fireEvent.change(inputElement, { target: { value: 'New Tech' } });
  expect(inputElement.value).toBe('New Tech');

  const buttonElement = screen.getByRole('button', { name: /Add Tech/i });
  fireEvent.click(buttonElement);
  expect(inputElement.value).toBe('');
});
