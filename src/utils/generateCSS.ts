/*
 * This file generates CSS rules based on the source image (i.e. an array of
 * pixel colors) and a text style, and appends them to the head of the HTML document.
 *
 */

import { Pixel, TextStyle } from "@/interfaces";

const generateCSS = (pixels: Pixel[], textStyle: TextStyle): Promise<void> => {
  return new Promise((resolve) => {
    const uniqueColors = new Set<string>();

    pixels.forEach((p) => {
      const pixelColor = `p-${p.r}-${p.g}-${p.b}`;
      uniqueColors.add(pixelColor);
    });

    const colorsArray = Array.from(uniqueColors);
    let cssRules = generateCSSWithTextStyle(colorsArray, textStyle);
    cssRules += ` body { 
      font-family: monospace;   
      white-space: pre;
      font-size: 12px;
      margin-top: 10px;
    }`;

    const stylesElement = document.getElementById("styles");
    if (stylesElement) {
      stylesElement.textContent = cssRules;
    } else {
      const styleElement = document.createElement("style");
      styleElement.id = "styles";
      styleElement.textContent = cssRules;
      document.head.appendChild(styleElement);
    }

    resolve();
  });
};

const generateCSSWithTextStyle = (
  colorsArray: string[],
  textStyle: TextStyle
) => {
  if (textStyle == TextStyle.INVERTED) {
    return colorsArray
      .map((pixel) => {
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
      .map((pixel) => {
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
      .map((pixel) => {
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

export default generateCSS;
