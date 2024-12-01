import { Message } from '@landbot/core/dist/src/types';
import { PageMessage } from '../domain/page-message';

export class PageMessagesMapper {
  public static messageToDomain(message: Message): PageMessage {
    const commonFields = {
      id: message.key,
      text: getText(message),
      timestamp: message.timestamp
    };

    switch (message.type) {
      case 'image':
        return {
          type: 'image',

          // @ts-expect-error url should be typed in Message
          imageUrl: message.url,

          ...commonFields
        };
      case 'dialog':
        return {
          type: 'dialog',

          // @ts-expect-error buttons should be typed in Message
          options: message.buttons,

          // @ts-expect-error payloads should be typed in Message
          payloads: message.payloads,

          ...commonFields
        };
      default:
        return {
          type: 'text',
          ...commonFields
        };
    }
  }
}

function getText(message: Message): string | undefined {
  // @ts-expect-error rich_text should be typed in Message
  return message.rich_text || message.title || message.message;
}
