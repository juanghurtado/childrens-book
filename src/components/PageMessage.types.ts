import { PageMessage } from '../domain/page-message';

export type PageMessageProps = {
  page: PageMessage;
} & React.HTMLAttributes<HTMLDivElement>;
