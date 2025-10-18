import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    expect(screen.getByText('Voyagez avec style')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<Hero />);
    expect(screen.getByText(/Johanne VTC vous accompagne/i)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<Hero />);
    expect(screen.getByText('Réserver maintenant')).toBeInTheDocument();
    expect(screen.getByText('En savoir plus')).toBeInTheDocument();
  });
});