import React, { useEffect, useRef } from "react";
import { Pixel } from "@interfaces/";

interface Props {
  imagePath: string;
  targetWidth: number;
  updateImagePixels: (pixels: Pixel[]) => void;
}

const ImagePixelData: React.FC<Props> = ({ imagePath, targetWidth, updateImagePixels }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const image = new Image();
      image.src = imagePath;

      console.log(image);

      image.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const aspectRatio = image.width / image.height;
        const targetHeight = Math.floor(targetWidth / aspectRatio);

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

        const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        const pixelData = imageData.data;

        const rgbData: Pixel[] = [];

        for (let i = 0; i < pixelData.length; i += 4) {
          const red = pixelData[i];
          const green = pixelData[i + 1];
          const blue = pixelData[i + 2];

          rgbData.push({ r: red, g: green, b: blue });
        }

        // Use the rgbData array as needed
        updateImagePixels(rgbData);
      };
    };

    loadImage();
  }, [imagePath, targetWidth]);

  return <canvas ref={canvasRef} />;
};

export default ImagePixelData;
