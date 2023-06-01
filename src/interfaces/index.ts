export interface Pixel {
  r: number,
  g: number,
  b: number,
}

export interface ImageData {
  pixels: Pixel[],
  imageWidth: number,
  imageHeight: number,
}

export enum TextStyle {
  TRANSPARENT,
  COMPLEMENTARY,
  INVERSE
}

export interface TextBlockProps {
  text: string;
  image: Pixel[];
}

export interface ModalProps {
  setText: (text: string) => void;
  setImageSrc: (src: any) => void;
  loading: boolean;
}

