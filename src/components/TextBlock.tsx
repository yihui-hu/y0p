import styles from "@styles/textblock.module.css";
import { TextBlockProps, Pixel } from "@interfaces/";

export default function TextBlock(props: TextBlockProps) {
  let text: string[] = props.text.split("");
  let image: Pixel[] = props.image;

  const rows = [];
  for (let i = 0; i < text.length; i += 160) {
    const rowCharacters = text.slice(i, i + 160);

    const row = (
      <div className={styles.row} key={i}>
        {rowCharacters.map((character, index) => {
          const pixel_index: number = i + index;

          // construct style heer
          
          return (
            <span className={pixel_index.toString()} key={index}>
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
