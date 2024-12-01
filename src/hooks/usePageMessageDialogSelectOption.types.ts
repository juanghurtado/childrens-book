type UsePageMessageDialogSelectOptionReturn = {
  selectOption: (option: string, payload: string) => Promise<void>;
};

export type UsePageMessageDialogSelectOption = (
  bookUrl: string
) => UsePageMessageDialogSelectOptionReturn;
