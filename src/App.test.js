import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Note Taking App title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Note Taking App/i);
  expect(titleElement).toBeInTheDocument();
});
