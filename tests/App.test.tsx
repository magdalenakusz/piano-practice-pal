import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the usePracticeData hook
vi.mock('../hooks/usePracticeData', () => ({
  usePracticeData: () => ({
    loading: false,
    dailyScales: [
      {
        name: 'C Major',
        type: 'major' as const,
        notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        intervals: [2, 2, 1, 2, 2, 2, 1],
      },
    ],
    currentIndex: 0,
    isSessionComplete: false,
    practiceData: {},
    userSettings: {
      enabledScaleTypes: {
        major: true,
        'natural-minor': false,
        'harmonic-minor': true,
        'melodic-minor': true,
      },
    },
    handleFeedback: vi.fn(),
    reset: vi.fn(),
    startNewSession: vi.fn(),
    updateSettings: vi.fn(),
  }),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Suppress canvas warnings in tests
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should render the app with basic structure', () => {
    const { container } = render(<App />);
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('should initialize with mocked practice data', () => {
    const { container } = render(<App />);
    // App renders with the mocked hook data
    expect(container).toBeInTheDocument();
  });
});
