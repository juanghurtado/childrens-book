export type TextPageMessage = {
  type: 'text';
  id: string;
  text?: string;
  timestamp: number;
};

export type ImagePageMessage = {
  type: 'image';
  id: string;
  text?: string;
  imageUrl: string;
  timestamp: number;
};

export type DialogPageMessage = {
  type: 'dialog';
  id: string;
  text?: string;
  options: string[];
  payloads: string[];
  timestamp: number;
};

export type PageMessage =
  | TextPageMessage
  | ImagePageMessage
  | DialogPageMessage;
