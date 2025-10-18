import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the main heading', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('Voyagez avec style')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    const { getByText } = render(<Hero />);
    expect(getByText(/Johanne VTC vous accompagne/i)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    const { getByText } = render(<Hero />);
    expect(getByText('Réserver maintenant')).toBeInTheDocument();
    expect(getByText('En savoir plus')).toBeInTheDocument();
  });
});