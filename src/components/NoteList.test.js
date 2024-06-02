import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteList from './NoteList';

test('renders NoteList and displays notes', () => {
  await act(async () => {
    render(<NoteList />);
  });

  const noteElement = screen.queryByText(/Test Note/i);
  expect(noteElement).toBeInTheDocument();
});
