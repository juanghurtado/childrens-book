import { PageMessageImageProps } from './PageMessageImage.types';

export const PageMessageImage = ({ page }: PageMessageImageProps) => {
  return (
    <>
      <img className="max-h-[500px]" src={page.imageUrl} />
    </>
  );
};
