import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the main heading', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('Travel in Style')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    const { getByText } = render(<Hero />);
    expect(getByText(/Johanne VTC accompanies you/i)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('Book Now')).toBeInTheDocument();
    expect(getByText('Learn More')).toBeInTheDocument();
  });
});