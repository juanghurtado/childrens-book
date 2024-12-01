import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  PageMessageDialogFactory,
  PageMessageImageFactory,
  PageMessageTextFactory
} from '../domain/page-message.factory';
import { PageMessage } from './PageMessage';

// Mock child components
vi.mock('./PageMessageDialog', () => ({
  PageMessageDialog: () => (
    <div data-testid="dialog-message">Dialog Message</div>
  )
}));

vi.mock('./PageMessageImage', () => ({
  PageMessageImage: () => <div data-testid="image-message">Image Message</div>
}));

vi.mock('./PageMessageText', () => ({
  PageMessageText: () => <div data-testid="text-message">Text Message</div>
}));

describe('PageMessage', () => {
  it('renders dialog message for dialog type', () => {
    const dialogPage = PageMessageDialogFactory.create();
    render(<PageMessage page={dialogPage} />);

    expect(screen.getByTestId('dialog-message')).toBeInTheDocument();
  });

  it('renders image message for image type', () => {
    const imagePage = PageMessageImageFactory.create();
    render(<PageMessage page={imagePage} />);

    expect(screen.getByTestId('image-message')).toBeInTheDocument();
  });

  it('renders text message for text type', () => {
    const textPage = PageMessageTextFactory.create();
    render(<PageMessage page={textPage} />);

    expect(screen.getByTestId('text-message')).toBeInTheDocument();
  });

  it('preserves additional className props', () => {
    const textPage = PageMessageTextFactory.create();
    const { container } = render(
      <PageMessage page={textPage} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
