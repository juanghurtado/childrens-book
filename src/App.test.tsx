import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

const mockUsePageMessages = vi.hoisted(() => vi.fn());
vi.mock('./hooks/usePageMessages', () => ({
  usePageMessages: mockUsePageMessages
}));

describe('App', () => {
  Element.prototype.scrollTo = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render nothing when loading', () => {
    mockUsePageMessages.mockReturnValue({
      messages: [],
      isLoading: true
    });

    const { container } = render(<App />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render messages when loaded', () => {
    mockUsePageMessages.mockReturnValue({
      messages: [
        {
          id: '1',
          type: 'text',
          text: 'Hello',
          timestamp: 1
        },
        {
          id: '2',
          type: 'text',
          text: 'World',
          timestamp: 2
        }
      ],
      isLoading: false
    });

    render(<App />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('should render messages with image correctly', () => {
    mockUsePageMessages.mockReturnValue({
      messages: [
        {
          id: '1',
          type: 'image',
          imageUrl: 'test-image.jpg',
          timestamp: 1
        },
        {
          id: '2',
          type: 'text',
          text: 'After Image Text',
          timestamp: 2
        }
      ],
      isLoading: false
    });

    render(<App />);

    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer).toHaveStyle({
      backgroundImage: 'url(test-image.jpg)'
    });
    expect(screen.getByText('After Image Text')).toBeInTheDocument();
  });

  it('should use placeholder image when no image messages exist', () => {
    mockUsePageMessages.mockReturnValue({
      messages: [
        {
          id: '1',
          type: 'text',
          text: 'Only Text',
          timestamp: 1
        }
      ],
      isLoading: false
    });

    render(<App />);

    const imageContainer = screen.getByTestId('image-container');
    expect(imageContainer).toHaveStyle({
      backgroundImage: 'url(/cuartoprincesas.png)'
    });
  });
});
