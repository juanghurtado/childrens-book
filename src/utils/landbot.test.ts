import { afterEach, describe, expect, it, vi } from 'vitest';
import { LandBotClient } from './landbot';

const destroyMock = vi.hoisted(() => vi.fn());

vi.mock('@landbot/core', () => ({
  default: class MockLandbotCore {
    destroy = destroyMock;
  }
}));

describe('LandBotClient', () => {
  const mockUrl = 'https://test.url/config';
  const mockConfig = { some: 'config' };

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockConfig)
    });
  });

  afterEach(() => {
    vi.clearAllMocks();

    LandBotClient.closeInstance(mockUrl);
  });

  describe('getInstance', () => {
    it('should create and return a new instance when url is not cached', async () => {
      const instance = await LandBotClient.getInstance(mockUrl);

      expect(fetch).toHaveBeenCalledWith(mockUrl);
      expect(instance).toBeDefined();
    });

    it('should return cached instance for same url', async () => {
      const instance1 = await LandBotClient.getInstance(mockUrl);
      const instance2 = await LandBotClient.getInstance(mockUrl);

      expect(fetch).toHaveBeenCalledWith(mockUrl);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(instance1).toBe(instance2);
    });
  });

  describe('closeInstance', () => {
    it('should destroy instance if it exists', async () => {
      await LandBotClient.getInstance(mockUrl);
      LandBotClient.closeInstance(mockUrl);

      expect(destroyMock).toHaveBeenCalled();
    });

    it('should do nothing if instance does not exist', () => {
      LandBotClient.closeInstance('nonexistent-url');

      expect(destroyMock).not.toHaveBeenCalled();
    });
  });
});
