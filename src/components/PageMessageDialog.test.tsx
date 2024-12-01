import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PageMessageDialogFactory } from '../domain/page-message.factory';
import { PageMessageDialog } from './PageMessageDialog';

const selectOptionMock = vi.fn().mockImplementation(async () => {
  return Promise.resolve();
});

vi.mock('../hooks/usePageMessageDialogSelectOption', () => ({
  usePageMessageDialogSelectOption: () => ({
    selectOption: selectOptionMock
  })
}));

describe('PageMessageDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders text content when provided', () => {
    const testMessage = 'Test message';
    const page = PageMessageDialogFactory.create({ text: testMessage });

    render(<PageMessageDialog page={page} />);

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('renders options as accessible buttons', () => {
    const options = ['Option 1', 'Option 2'];
    const page = PageMessageDialogFactory.create({
      options
    });

    render(<PageMessageDialog page={page} />);

    expect(
      screen.getByRole('button', { name: /select option: option 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /select option: option 2/i })
    ).toBeInTheDocument();
  });

  it('calls selectOption when an option is clicked', async () => {
    const user = userEvent.setup();
    const options = ['Option 1'];
    const payloads = ['payload1'];
    const page = PageMessageDialogFactory.create({
      options,
      payloads
    });

    render(<PageMessageDialog page={page} />);

    await user.click(
      screen.getByRole('button', { name: /select option: option 1/i })
    );
    expect(selectOptionMock).toHaveBeenCalledWith('Option 1', 'payload1');
  });

  it('disables all buttons when an option is selected', async () => {
    const user = userEvent.setup();
    const options = ['Option 1', 'Option 2'];
    const page = PageMessageDialogFactory.create({ options });

    render(<PageMessageDialog page={page} />);
    await user.click(
      screen.getByRole('button', { name: /select option: option 1/i })
    );

    options.forEach((option) => {
      expect(
        screen.getByRole('button', { name: `Select option: ${option}` })
      ).toBeDisabled();
    });
  });

  it('shows error message when option selection fails', async () => {
    const user = userEvent.setup();
    selectOptionMock.mockRejectedValueOnce(new Error('Failed to select'));
    const page = PageMessageDialogFactory.create({ options: ['Option 1'] });

    render(<PageMessageDialog page={page} />);
    await user.click(
      screen.getByRole('button', { name: /select option: option 1/i })
    );

    expect(window.alert).toHaveBeenCalledWith(
      'Algo ha ido mal y no se ha podido seleccionar la opción. Por favor, inténtalo de nuevo en unos minutos'
    );
  });

  it('renders HTML content when provided in text', () => {
    const htmlContent = '<p>Test <strong>message</strong></p>';
    const page = PageMessageDialogFactory.create({ text: htmlContent });

    render(<PageMessageDialog page={page} />);

    expect(screen.getByText('message')).toHaveProperty('tagName', 'STRONG');
  });
});
