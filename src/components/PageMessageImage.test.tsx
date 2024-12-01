import { render, screen } from '@testing-library/react';
import { PageMessageImageFactory } from '../domain/page-message.factory';
import { PageMessageImage } from './PageMessageImage';

describe('PageMessageImage', () => {
  const mockPage = PageMessageImageFactory.create();

  it('renders the image with correct source', () => {
    render(<PageMessageImage page={mockPage} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockPage.imageUrl);
  });
});
