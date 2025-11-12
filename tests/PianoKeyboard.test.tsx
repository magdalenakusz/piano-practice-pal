import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PianoKeyboard } from '../components/PianoKeyboard';

describe('PianoKeyboard Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<PianoKeyboard scaleNotes={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('should render container with flex layout', () => {
    const { container } = render(<PianoKeyboard scaleNotes={[]} />);
    const flexContainer = container.querySelector('.flex');
    
    expect(flexContainer).toBeInTheDocument();
  });

  it('should render C major scale', () => {
    const cMajorScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const { container } = render(<PianoKeyboard scaleNotes={cMajorScale} />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('should handle empty scale notes array', () => {
    const { container } = render(<PianoKeyboard scaleNotes={[]} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('should handle sharp notes', () => {
    const scaleNotes = ['C#', 'F#', 'G#'];
    const { container } = render(<PianoKeyboard scaleNotes={scaleNotes} />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('should handle flat notes', () => {
    const scaleNotes = ['Bb', 'Eb', 'Ab'];
    const { container } = render(<PianoKeyboard scaleNotes={scaleNotes} />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('should render with active note', () => {
    const scaleNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const { container } = render(
      <PianoKeyboard scaleNotes={scaleNotes} activeNote="C4" activeNoteIndex={0} />
    );
    
    expect(container.firstChild).toBeTruthy();
  });

  it('should render chromatic scale', () => {
    const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const { container } = render(<PianoKeyboard scaleNotes={chromaticScale} />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('should render with all scale types', () => {
    // Test with a harmonic minor scale (has different intervals)
    const aHarmonicMinor = ['A', 'B', 'C', 'D', 'E', 'F', 'G#'];
    const { container } = render(<PianoKeyboard scaleNotes={aHarmonicMinor} />);
    
    expect(container.firstChild).toBeTruthy();
  });

  it('should handle notes with octave numbers', () => {
    const scaleNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
    const { container } = render(<PianoKeyboard scaleNotes={scaleNotes} />);
    
    expect(container.firstChild).toBeTruthy();
  });
});
