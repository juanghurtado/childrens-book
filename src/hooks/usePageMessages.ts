import { Message } from '@landbot/core/dist/src/types';
import { useEffect, useState } from 'react';
import { PageMessage } from '../domain/page-message';
import { LandBotClient } from '../utils/landbot';
import { PageMessagesMapper } from './usePageMessages.mapper';
import { UsePageMessages } from './usePageMessages.types';

// We only want to display text, image and dialog messages
const WHITELISTED_TYPES = ['text', 'image', 'dialog'];

export const usePageMessages: UsePageMessages = (bookUrl) => {
  // Messages state: we use a dictionary by message key in order to avoid duplicates
  const [messages, setMessages] = useState<Record<string, PageMessage>>({});

  // Flag to signal if the hook is loading the data or not: classic pattern
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const landbotClient = await LandBotClient.getInstance(bookUrl);

      // 3. Subscribe to incoming messages
      landbotClient.pipelines.$readableSequence.subscribe(
        (message: Message) => {
          // Early return if the message type is not whitelisted
          if (!WHITELISTED_TYPES.includes(message.type)) return;

          setMessages((prev) => ({
            ...prev,
            [message.key]: PageMessagesMapper.messageToDomain(message)
          }));
        }
      );

      // 4. Init client & get initial messages
      const data = await landbotClient.init();

      setIsLoading(false);

      setMessages(
        Object.values(data.messages)
          // Filter out messages that are not whitelisted
          .filter((msg) => WHITELISTED_TYPES.includes(msg.type))
          .reduce(
            (obj, next) => {
              obj[next.key] = PageMessagesMapper.messageToDomain(next);
              return obj;
            },
            {} as Record<string, PageMessage>
          )
      );
    })();

    return () => {
      // Destroy the client when the component unmounts
      LandBotClient.closeInstance(bookUrl);
    };
  }, [bookUrl]);

  return {
    messages: Object.values(messages).sort((a, b) => a.timestamp - b.timestamp),
    isLoading
  };
};
