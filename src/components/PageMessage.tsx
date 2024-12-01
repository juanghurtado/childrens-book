import { PageMessageProps } from './PageMessage.types';
import { PageMessageDialog } from './PageMessageDialog';
import { PageMessageImage } from './PageMessageImage';
import { PageMessageText } from './PageMessageText';

export const PageMessage = ({ page, ...rest }: PageMessageProps) => {
  return (
    <div
      {...rest}
      className={`p-4 space-y-4 animate-in fade-in zoom-in ${rest.className || ''}`}
      style={{ '--delay': '0.25s' } as React.CSSProperties}
    >
      {page.type === 'image' ? (
        <PageMessageImage page={page} />
      ) : page.type === 'dialog' ? (
        <PageMessageDialog page={page} />
      ) : (
        <PageMessageText page={page} />
      )}
    </div>
  );
};
