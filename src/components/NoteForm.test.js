import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteForm from './NoteForm';

test('renders NoteForm and submits a note', async () => {
  await act(async () => {
    render(<NoteForm />);
  });

  const textareaElement = screen.getByRole('textbox');
  expect(textareaElement).toBeInTheDocument();

  fireEvent.change(textareaElement, { target: { value: 'Test Note' } });
  expect(textareaElement.value).toBe('Test Note');

  const buttonElement = screen.getByRole('button', { name: /Add Note/i });
  fireEvent.click(buttonElement);
  expect(textareaElement.value).toBe('');
  await new Promise((r) => setTimeout(r, 1000)); // Wait for state update
});
