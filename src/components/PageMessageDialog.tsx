import { useCallback, useState } from 'react';
import { usePageMessageDialogSelectOption } from '../hooks/usePageMessageDialogSelectOption';
import { PageMessageDialogProps } from './PageMessageDialog.types';

export const PageMessageDialog = ({ page }: PageMessageDialogProps) => {
  const [isLoading, setIsLoading] = useState<string | undefined>();
  const { selectOption } = usePageMessageDialogSelectOption(
    `https://landbot.online/v3/H-2700320-PXW3AL3F5TEP48CR/index.json`
  );

  const onOptionClick = useCallback(
    async (option: string, index: number) => {
      try {
        setIsLoading(option);
        await selectOption(option, page.payloads[index]);
      } catch (err) {
        console.error(err);

        alert(
          'Algo ha ido mal y no se ha podido seleccionar la opción. Por favor, inténtalo de nuevo en unos minutos'
        );
      }
    },
    [page.payloads, selectOption]
  );

  return (
    <>
      {!!page.text && (
        <div
          className="space-y-4 text-xl"
          dangerouslySetInnerHTML={{
            __html: page.text
          }}
        />
      )}

      {page.options.length > 0 && (
        <div className="flex flex-row gap-2 border-t pt-4">
          {page.options.map((option, index) => (
            <button
              type="button"
              key={option}
              disabled={!!isLoading}
              aria-label={`Select option: ${option}`}
              onClick={async () => {
                onOptionClick(option, index);
              }}
              className={`flex-1 font-semibold border bg-amber-100 border-amber-300 text-amber-900 hover:border-amber-950 hover:bg-amber-200 hover:text-amber-800 transition-colors rounded-md p-2 text-center ${isLoading === option ? 'opacity-30' : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
