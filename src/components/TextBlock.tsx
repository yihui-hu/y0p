import React from "react";
import styles from "@styles/textblock.module.css";
import { TextBlockProps, Pixel } from "@interfaces/";

const TextBlock: React.FC<TextBlockProps> = (props: TextBlockProps) => {
  let text: string[] = props.text.split("");
  let image: Pixel[] = props.image;

  const rows = [];
  for (let i = 0; i < text.length; i += 160) {
    const rowCharacters = text.slice(i, i + 160);

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

  return <div className={styles.text}>{rows}</div>;
}

export default TextBlock;