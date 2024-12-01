import { PageMessage } from '../domain/page-message';

type UsePageMessagesReturn = {
  messages: PageMessage[];
  isLoading: boolean;
};

export type UsePageMessages = (bookUrl: string) => UsePageMessagesReturn;
