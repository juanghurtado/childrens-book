import { PageMessageTextProps } from './PageMessageText.types';

export const PageMessageText = ({ page }: PageMessageTextProps) => {
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
    </>
  );
};
