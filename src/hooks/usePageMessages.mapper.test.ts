import { Message } from '@landbot/core/dist/src/types';
import { PageMessagesMapper } from './usePageMessages.mapper';

function getLandbotMessage(customValues: Partial<Message> = {}): Message {
  const defaultValues: Message = {
    id: '111111',
    key: 'ASDFG',
    type: 'text',
    title: 'title',
    message: 'message',
    timestamp: 123
  };

  return {
    ...defaultValues,
    ...customValues
  };
}

describe('PageMessageMapper', () => {
  describe('messageToDomain()', () => {
    describe('type `image`', () => {
      it('should return a PageMessage with type `image`', () => {
        const message: Message = getLandbotMessage({
          type: 'image',

          // @ts-expect-error url should be typed in Message
          url: 'https://example'
        });

        const result = PageMessagesMapper.messageToDomain(message);

        expect(result).toEqual({
          id: message.key,
          type: 'image',
          text: message.title,
          timestamp: message.timestamp,

          // @ts-expect-error url should be typed in Message
          imageUrl: message.url
        });
      });
    });

    describe('type `dialog`', () => {
      it('should return a PageMessage with type `dialog`', () => {
        const message: Message = getLandbotMessage({
          type: 'dialog',

          // @ts-expect-error payloads should be typed in Message
          payloads: ['A', 'B'],
          buttons: ['A', 'B']
        });

        const result = PageMessagesMapper.messageToDomain(message);

        expect(result).toEqual({
          id: message.key,
          type: 'dialog',
          text: message.title,
          timestamp: message.timestamp,

          // @ts-expect-error payloads should be typed in Message
          payloads: message.payloads,

          // @ts-expect-error buttons should be typed in Message
          options: message.buttons
        });
      });
    });

    describe('type `text`', () => {
      it('should return a PageMessage with type `text`', () => {
        const message: Message = getLandbotMessage();

        const result = PageMessagesMapper.messageToDomain(message);

        expect(result).toEqual({
          id: message.key,
          type: 'text',
          text: message.title,
          timestamp: message.timestamp
        });
      });

      it('should set text to message if no title is present', () => {
        const message: Message = getLandbotMessage({
          title: undefined,
          message: 'message'
        });

        const result = PageMessagesMapper.messageToDomain(message);

        expect(result).toEqual({
          id: message.key,
          type: 'text',
          text: message.message,
          timestamp: message.timestamp
        });
      });
    });

    describe('any other type', () => {
      it('should return a PageMessage with type `text`', () => {
        const message: Message = getLandbotMessage({
          type: 'iframe'
        });

        const result = PageMessagesMapper.messageToDomain(message);

        expect(result).toEqual({
          id: message.key,
          type: 'text',
          text: message.title,
          timestamp: message.timestamp
        });
      });
    });
  });
});
