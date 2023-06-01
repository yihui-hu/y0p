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
  INVERTED,
  VEILED
}

export interface TextBlockProps {
  text: string;
  image: Pixel[];
}

export interface ModalProps {
  setText: (text: string) => void;
  setImageSrc: (src: any) => void;
  setTextStyle: (style: TextStyle) => void;
  loading: boolean;
  filesURL: string;
}

