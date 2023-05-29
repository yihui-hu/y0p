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
          const pixel_index: number = i + index;

          const background_color = `rgb(${image[pixel_index]?.r ?? 255}, 
                                        ${image[pixel_index]?.g ?? 255}, 
                                        ${image[pixel_index]?.b ?? 255})`;
            
          const color = `rgb(${255 - (image[pixel_index]?.r ?? 255)}, 
                             ${255 - (image[pixel_index]?.g ?? 255)}, 
                             ${255 - (image[pixel_index]?.b ?? 255)})`;

          const style = {
            // ::selection {

            // }
            "background-color": background_color,
            "color": color,
          };

          return (
            <span style={style} key={index} className={index.toString()}>
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