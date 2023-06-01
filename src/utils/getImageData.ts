import { ImageData, Pixel } from "@/interfaces/";

// @TODO: determine image size logic here
const getImageData = async (imageUrl: string): Promise<ImageData> => {
  try { 
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const imageBitmap = await createImageBitmap(new Blob([arrayBuffer]));
  
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    console.log(window.innerHeight);
    console.log(window.innerWidth);

    const aspectRatio = imageBitmap.width / imageBitmap.height;
    const targetWidth = 180;
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
  
    return { pixels: pixels, imageWidth: targetWidth, imageHeight: targetHeight };
  } catch (err) {
    console.log(err);
    return { pixels: [], imageWidth: 0, imageHeight: 0 };
  }
};

export default getImageData;