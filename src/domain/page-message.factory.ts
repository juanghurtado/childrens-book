import {
  DialogPageMessage,
  ImagePageMessage,
  TextPageMessage
} from './page-message';

export class PageMessageImageFactory {
  public static create(
    props: Partial<ImagePageMessage> = {}
  ): ImagePageMessage {
    const defaultProps: ImagePageMessage = {
      id: '1',
      type: 'image',
      imageUrl: 'test-image.jpg',
      timestamp: 1
    };

    return { ...defaultProps, ...props };
  }
}

export class PageMessageDialogFactory {
  public static create(
    props: Partial<DialogPageMessage> = {}
  ): DialogPageMessage {
    const defaultProps: DialogPageMessage = {
      id: '1',
      type: 'dialog',
      options: ['A', 'B'],
      payloads: ['A', 'B'],
      timestamp: 1
    };

    return { ...defaultProps, ...props };
  }
}

export class PageMessageTextFactory {
  public static create(props: Partial<TextPageMessage> = {}): TextPageMessage {
    const defaultProps: TextPageMessage = {
      id: '1',
      type: 'text',
      text: 'lorem ipsum dolor',
      timestamp: 1
    };

    return { ...defaultProps, ...props };
  }
}
