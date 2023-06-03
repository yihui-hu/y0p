/* 
 * This file generates the body of text. The overall div contains individual 
 * divs representing rows of pixels, split according to the image scale, and 
 * each row contains multiple span elements, each representing one pixel, with
 * each having a class name based on the RGB values of the corresponding pixel 
 * in the source image.
 * 
 */

import React from "react";
import styles from "@/styles/textblock.module.css";
import { TextBlockProps } from "@/interfaces/";

const TextBlock: React.FC<TextBlockProps> = ({ text, image, imgScale }) => {
  const rows = [];
  const length = imgScale;
  const splitText = text.replace(/(\r\n|\n|\r)/gm, " ").split("");

  for (let i = 0; i < splitText.length; i += length) {
    const rowCharacters = splitText.slice(i, i + length);

    const row = (
      <div className={styles.row} key={i}>
        {rowCharacters.map((character, index) => {
          const { r, g, b } = image[i + index] ?? { r: 255, g: 255, b: 255 };

          return (
            <span key={index} className={`p-${r}-${g}-${b}`}>
              {character}
            </span>
          );
        })}
      </div>
    );

    rows.push(row);
  }

  return <div id="textBlock" className={styles.text}>{rows}</div>;
}

export default TextBlock;