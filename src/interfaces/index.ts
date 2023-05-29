export interface Pixel {
  r: number,
  g: number,
  b: number,
}

export interface TextBlockProps {
  text: string;
  image: Pixel[];
}

export interface ModalProps {
  updateText: (text: string) => void;
  updateImage: (src: any) => void;
}

