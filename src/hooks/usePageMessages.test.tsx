import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PageMessage } from '../domain/page-message';
import { usePageMessages } from './usePageMessages';
import { PageMessagesMapper } from './usePageMessages.mapper';

const subscribeMock = vi.hoisted(() => vi.fn());
const destroyMock = vi.hoisted(() => vi.fn());
const initMock = vi.hoisted(() => vi.fn().mockResolvedValue({ messages: {} }));

vi.mock('@landbot/core', () => ({
  default: class MockLandbotCore {
    pipelines = {
      $readableSequence: {
        subscribe: subscribeMock
      }
    };
    init = initMock;
    destroy = destroyMock;
  }
}));

describe('usePageMessages', () => {
  const mockBookUrl = 'http://test.com/book.json';
  const mockConfig = { some: 'config' };

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockConfig)
    });

    initMock.mockResolvedValue({
      messages: {}
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch config on mount', async () => {
    renderHook(() => usePageMessages(mockBookUrl));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(mockBookUrl);
    });
  });

  it('should return empty messages array initially', async () => {
    const { result } = renderHook(() => usePageMessages(mockBookUrl));

    await waitFor(() => {
      expect(result.current.messages).toEqual([]);
    });
  });

  it('should sort messages by timestamp', async () => {
    vi.spyOn(PageMessagesMapper, 'messageToDomain').mockImplementation(
      (msg) => ({ ...msg, type: 'text' })
    );

    initMock.mockResolvedValue({
      messages: {
        msg1: { key: 'msg1', timestamp: 2, type: 'text' },
        msg2: { key: 'msg2', timestamp: 1, type: 'text' }
      }
    });

    const { result } = renderHook(() => usePageMessages(mockBookUrl));

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
      expect(result.current.messages[0].timestamp).toBe(1);
      expect(result.current.messages[1].timestamp).toBe(2);
    });
  });

  it('should subscribe to readableSequence after initialization', async () => {
    renderHook(() => usePageMessages(mockBookUrl));

    await waitFor(() => {
      expect(subscribeMock).toHaveBeenCalled();
    });
  });

  it('should add new messages received through subscription', async () => {
    const messageDomainMock: PageMessage = {
      id: 'aaaa',
      type: 'text',
      text: 'Hello',
      timestamp: 1
    };

    vi.spyOn(PageMessagesMapper, 'messageToDomain').mockReturnValue(
      messageDomainMock
    );

    const { result } = renderHook(() => usePageMessages(mockBookUrl));

    await waitFor(() => {
      // Get the subscription callback that was registered
      const subscriptionCallback = subscribeMock.mock.calls[0][0];

      // Simulate receiving a new message
      subscriptionCallback({
        key: 'new-message',
        type: 'text',
        message: 'Hello',
        timestamp: 1
      });
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0]).toEqual(messageDomainMock);
    });
  });
});
