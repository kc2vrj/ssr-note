import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoteList from './NoteList';

test('renders NoteList and displays notes', () => {
  render(<NoteList />);

  const noteElement = screen.getByText(/Test Note/i);
  expect(noteElement).toBeInTheDocument();
});
