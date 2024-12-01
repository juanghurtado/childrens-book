import { render, screen } from '@testing-library/react';
import { PageMessageTextFactory } from '../domain/page-message.factory';
import { PageMessageText } from './PageMessageText';

describe('PageMessageText', () => {
  it('renders text content', () => {
    const mockPage = PageMessageTextFactory.create();
    render(<PageMessageText page={mockPage} />);

    expect(screen.getByText('lorem ipsum dolor')).toBeInTheDocument();
  });

  it('renders HTML content safely', () => {
    const mockPage = PageMessageTextFactory.create({
      text: '<p>Hello <strong>World</strong></p>'
    });
    render(<PageMessageText page={mockPage} />);

    const strongElement = screen.getByText('World');
    expect(strongElement.tagName).toBe('STRONG');
  });

  it('renders nothing when text is empty', () => {
    const mockPage = PageMessageTextFactory.create({ text: '' });
    const { container } = render(<PageMessageText page={mockPage} />);

    expect(container.firstChild).toBeNull();
  });
});
