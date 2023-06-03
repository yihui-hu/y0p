/*
 * The function takes in a string (i.e. text from the input in the modal) and
 * the size of an image, and repeats the string to fit the specified image size.
 * 
 */

import { ImageSize } from "@/interfaces";

const repeatText = (text: string, imageSize: ImageSize): Promise<string> => {
  return new Promise((resolve) => {
    const length: number = imageSize.width * imageSize.height;
    while (text.length < length) {
      text += " ";
      text += text;
    }
    text = text.slice(0, length - 3) + "...";
    resolve(text);
  });
};

export default repeatText;
