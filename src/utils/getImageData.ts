/**
 * This file takes in an image URL and scale, retrieves the image data, resizes
 * it, and returns the pixel data along with the new width and height based
 * on the image scale.
 *
 */

import { ImageData, Pixel } from "@/interfaces/";

const getImageData = async (
  imageUrl: string,
  imgScale: number
): Promise<ImageData> => {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const imageBitmap = await createImageBitmap(new Blob([arrayBuffer]));

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const aspectRatio = imageBitmap.width / imageBitmap.height;
    const targetWidth = imgScale;
    const targetHeight = Math.floor(targetWidth / aspectRatio);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    context?.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);

    const imageData = context?.getImageData(0, 0, targetWidth, targetHeight);
    const pixels: Pixel[] = [];

    if (imageData) {
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const pixel: Pixel = {
          r: data[i],
          g: data[i + 1],
          b: data[i + 2],
        };
        pixels.push(pixel);
      }
    }

    return { pixels: pixels, width: targetWidth, height: targetHeight };
  } catch (err) {
    console.log(err);
    return { pixels: [], width: 0, height: 0 };
  }
};

export default getImageData;
