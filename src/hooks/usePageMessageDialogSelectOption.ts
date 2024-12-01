import { useCallback } from 'react';
import { LandBotClient } from '../utils/landbot';
import { UsePageMessageDialogSelectOption } from './usePageMessageDialogSelectOption.types';

export const usePageMessageDialogSelectOption: UsePageMessageDialogSelectOption =
  (bookUrl) => {
    const selectOption = useCallback(
      async (option: string, payload: string) => {
        const landbotClient = await LandBotClient.getInstance(bookUrl);

        landbotClient.sendMessage({
          type: 'button',
          message: option,
          payload
        });
      },
      [bookUrl]
    );

    return {
      selectOption
    };
  };
