"use client";

import { useState, useEffect } from "react";
import TextBlock from "@components/TextBlock";
import Modal from "@components/Modal";
import ImagePixelData from "@components/ImagePixelData";
import sampleText from "@samples/sampleText";
import localFont from "next/font/local";
import { Pixel } from "@interfaces/";

const PantasiaUnlicensedTrial = localFont({
  src: "../assets/fonts/PantasiaUnlicensedTrial-Regular.woff2",
});

const Home: React.FC = () => {
  const [text, setText] = useState<string>(sampleText);
  const [imagePath, setImagePath] = useState<string | null>(
    "/samples/sampleImage.png"
  );
  const [imagePixels, setImagePixels] = useState<Pixel[]>([]);
  const [imageHeight, setImageHeight] = useState<number>(0);

  function updateText(text: string) {
    while (text.length < 19720) {
      text += " ";
      text += text;
    }
    text = text.slice(0, 18894) + "...";
    setText(text);
  }

  function updateImage(src: any) {
    setImagePath(src);
  }

  function updateImagePixels(pixels: Pixel[]) {
    setImagePixels(pixels);
    generateCSSStylesheet(pixels);
  }

  const generateCSSStylesheet = (pixels: Pixel[]): void => {
    const uniqueColors = new Set<string>();
    pixels.forEach((p) => {
      const pixelColor = `p-${p.r}-${p.g}-${p.b}`;
      uniqueColors.add(pixelColor);
    })
    const colorsArray = Array.from(uniqueColors);

    console.log(colorsArray);

    const cssRules = colorsArray
      .map((pixel, index) => {
        const splitPixel = pixel.split("-");
        const r = splitPixel[1]
        const g = splitPixel[2]
        const b = splitPixel[3]
        const r_inverse = (255 - parseInt(r)).toString();
        const g_inverse = (255 - parseInt(g)).toString();
        const b_inverse = (255 - parseInt(b)).toString();
        return `.p-${r}-${g}-${b}::selection { 
                  color: rgb(${r_inverse}, ${g_inverse}, ${b_inverse});
                  background-color: rgb(${r}, ${g}, ${b}); 
                }`;
      })
      .join("\n");

    // Create a style element
    const styleElement = document.createElement("style");

    // Set the CSS rules as text content of the style element
    styleElement.textContent = cssRules;

    // Append the style element to the document's head
    document.head.appendChild(styleElement);

    // // Create a blob with the CSS content
    // const cssBlob = new Blob([cssRules], { type: "text/css" });

    // // Create a URL for the blob
    // const cssURL = URL.createObjectURL(cssBlob);

    // // Create a link element to download the CSS file
    // const linkElement = document.createElement("a");
    // linkElement.href = cssURL;
    // linkElement.download = "pixels.css";

    // // Simulate a click event to trigger the download
    // linkElement.click();

    // // Clean up the created URL
    // URL.revokeObjectURL(cssURL);
  };

  return (
    <main className={PantasiaUnlicensedTrial.className}>
      <Modal updateText={updateText} updateImage={updateImage} />
      <TextBlock text={text} image={imagePixels} />
      <ImagePixelData
        imagePath={imagePath || ""}
        targetWidth={160}
        updateImagePixels={updateImagePixels}
      />
    </main>
  );
};

export default Home;
