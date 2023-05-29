## 28 May 2023 – 11:23pm

### User flow / make up of website:

1. Main page displays sample image and text (ideally all static, but have to integrate point #2)
2. Open modal to upload own text + image w/ live preview (to be determined: ::selection pseudo element in live preview...)
3. Ability to download the static HTML + CSS files from the modal for own use

## 29 May 2023 – 8:03am

### Synchronizing live preview + preparation of static HTML + CSS files

1. Get image and text from user
2. Downsize image, get width and height dimensions (preserving aspect ratio)
3. Repeat text to fit new image dimensions (i.e. #chars = width \* height)
4. Extract rgb values from image
5. Compose array of _unique_ rgb classes for the `css` stylesheet

  ```js
  function createStylesheet(pixels: Pixel[]) {
    const uniqueColors = new Set<string>();
    pixels.forEach((p) => {
      const pixelColor = `pixel-${p.r}-${p.g}-${p.b}`;
      uniqueColors.add(pixelColor);
    })
    const colorsArray = Array.from(uniqueColors);
  }
  ```

- Compose the `<span>` classes for each character:

  ```js
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
  ```
