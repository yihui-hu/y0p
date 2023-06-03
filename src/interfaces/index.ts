/*
 * Interfaces used throughout the application, documented with JSDoc
 * 
 */

/**
 * representation of a pixel
 * 
 * @param r red value
 * @param g green value
 * @param b blue value
 */
export interface Pixel {
  r: number,
  g: number,
  b: number,
}

/**
 * pixels, width and height of image
 * 
 * @param pixels array of Pixels from image
 * @param width width of image
 * @param height height of image
 */
export interface ImageData {
  pixels: Pixel[],
  width: number,
  height: number,
}

/**
 * size of image
 * 
 * @param width width of image
 * @param height height of image
 */
export interface ImageSize {
  width: number,
  height: number,
}

/**
 * styles applied to body text
 * 
 * @param TRANSPARENT text is invisible
 * @param INVERTED text has inverted colors
 * @param VEILED text appears translucent
 */
export enum TextStyle {
  TRANSPARENT,
  INVERTED,
  VEILED
}

/**
 * props passed into TextBlock component
 * 
 * @param text string of text to display
 * @param image array of Pixels from image
 */
export interface TextBlockProps {
  text: string;
  image: Pixel[];
  imgScale: number;
}

/**
 * props passed into Modal component
 * 
 * @param setText useState function to set body text
 * @param setImageSrc useState function to set image source
 * @param setTextStyle useState function to set text style
 * @param setImgScale useState function to set image scale
 * @param imgScale scale of image (measured w/ width of image in pixels)
 * @param loading determines whether app is in loading state
 */
export interface ModalProps {
  setText: (text: string) => void;
  setImgSrc: (src: any) => void;
  setTextStyle: (style: TextStyle) => void;
  setImgScale: (scale: number) => void;
  imgScale: number;
  loading: boolean;
}

