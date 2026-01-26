import React from 'react';
import { render, screen } from '@testing-library/react';
import Skills from './index';

describe('Skills', () => {
  test('renders skills title', () => {
    render(<Skills />);
    expect(screen.getByText('Stack Matrix')).toBeInTheDocument();
  });
});
