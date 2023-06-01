import { Pixel, TextStyle } from "@/interfaces";
import { Dispatch, SetStateAction } from "react";

const generateCSS = (
  pixels: Pixel[],
  textStyle: TextStyle,
  setFilesURL: Dispatch<SetStateAction<string>>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const uniqueColors = new Set<string>();

    pixels.forEach((p) => {
      const pixelColor = `p-${p.r}-${p.g}-${p.b}`;
      uniqueColors.add(pixelColor);
    });

    const colorsArray = Array.from(uniqueColors);
    const cssRules = generateCSSWithTextStyle(colorsArray, textStyle);

    // Create stylesheet and append to <head> of document
    const styleElement = document.createElement("style");
    styleElement.id = "styles";
    styleElement.textContent = cssRules;
    document.head.appendChild(styleElement);

    // Create static file
    generateCSSFile(cssRules, setFilesURL);

    resolve();
  });
};

const generateCSSWithTextStyle = (
  colorsArray: string[],
  textStyle: TextStyle
) => {
  if (textStyle == TextStyle.INVERTED) {
    return colorsArray
      .map((pixel, index) => {
        const splitPixel = pixel.split("-");
        const [p, r, g, b] = splitPixel;
        const r_complement = (255 - parseInt(r)).toString();
        const g_complement = (255 - parseInt(g)).toString();
        const b_complement = (255 - parseInt(b)).toString();
        return `.p-${r}-${g}-${b}::selection { 
              color: rgb(${r_complement}, ${g_complement}, ${b_complement});
              background-color: rgb(${r}, ${g}, ${b}); 
            }`;
      })
      .join("\n");
  } else if (textStyle == TextStyle.VEILED) {
    return colorsArray
      .map((pixel, index) => {
        const splitPixel = pixel.split("-");
        const [p, r, g, b] = splitPixel;
        return `.p-${r}-${g}-${b}::selection { 
              color: rgb(0, 0, 0, 0.3);
              background-color: rgb(${r}, ${g}, ${b}); 
            }`;
      })
      .join("\n");
  } else {
    return colorsArray
      .map((pixel, index) => {
        const splitPixel = pixel.split("-");
        const [p, r, g, b] = splitPixel;
        return `.p-${r}-${g}-${b}::selection { 
              color: rgb(${r}, ${g}, ${b}, 0);
              background-color: rgb(${r}, ${g}, ${b}); 
            }`;
      })
      .join("\n");
  }
};

const generateCSSFile = (
  cssRules: string,
  setFilesURL: Dispatch<SetStateAction<string>>
) => {
  // Create a blob with the CSS content
  const cssBlob = new Blob([cssRules], { type: "text/css" });
  const cssURL = URL.createObjectURL(cssBlob);
  setFilesURL(cssURL);
};

export default generateCSS;
