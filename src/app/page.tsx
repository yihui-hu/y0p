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

  // useEffect(() => {
  //   console.log("creating style");
  //   // Create a style element
  //   const styleElement = document.createElement("style");

  //   // Define the CSS rules
  //   const cssRules = `
  //     .body {
  //       color: red !important;
  //       font-size: 18px;
  //     }
  //   `;

  //   // Set the CSS rules as text content of the style element
  //   styleElement.textContent = cssRules;

  //   // Append the style element to the document's head
  //   document.head.appendChild(styleElement);
  // }, []);

  // function createStylesheet(pixels: Pixel[]) {
  //   const uniqueColors = new Set<string>();
  //   for (let i = 0; i < pixels.length; i++) {
  //     const color =
  //       "pixel-" +
  //       pixels[i].r.toString() +
  //       "-" +
  //       pixels[i].g.toString() +
  //       "-" +
  //       pixels[i].b.toString();
  //     uniqueColors.add(color);
  //   }

  //   const colorArray = Array.from(uniqueColors);
  //   console.log(colorArray);
  // }

  const generateCSSStylesheet = (pixels: Pixel[]): void => {
    // Create the CSS rules based on the pixels array
    const cssRules = pixels
      .map((pixel, index) => {
        const { r, g, b } = pixel;
        return `.pixel-${r}-${g}-${b} { background-color: rgb(${r}, ${g}, ${b}); }`;
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
