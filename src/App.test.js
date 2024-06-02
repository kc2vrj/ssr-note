import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Note Taking App title', () => {
  await act(async () => {
    render(<App />);
  });
  const titleElement = screen.getByText(/Note Taking App/i);
  expect(titleElement).toBeInTheDocument();
});
