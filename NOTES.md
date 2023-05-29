## 28 May 2023 11:23pm

### User flow / make up of website:

1. Main page displays sample image and text (ideally all static, but have to integrate point #2)
2. Open modal to upload own text + image w/ live preview (to be determined: ::selection pseudo element in live preview...)
3. Ability to download the static HTML + CSS files from the modal for own use

### Synchronizing live preview + preparation of static HTML + CSS files

- Get image and text from user
- Downsize image, get width and height dimensions (preserving aspect ratio)
- Repeat text to fit new image dimensions (i.e. #chars = width \* height)
- Extract rgb values from image
- Compose array of _unique_ rgb classes for the `css` stylesheet

  ```js
  function createStylesheet(pixels: Pixel[]) {
    const uniqueColors = new Set<string>();
    forEach(pixels)
    for (let i = 0; i < pixels.length; i++) {
      const color =
         "pixel-" +
         pixels[i].r.toString() +
         "-" +
         pixels[i].g.toString() +
         "-" +
         pixels[i].b.toString();
       uniqueColors.add(color);
     }

     const colorArray = Array.from(uniqueColors);
     console.log(colorArray);
   }
  ```

- Compose the `<span>` classes for each character:

  ```js
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
          "background-color": background_color,
          color: color,
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
  ```

  ```js
  forEach();
  for (let i = 0; i < pixels.length; i++) {
    const { r, g, b } = pixels[i];
    const className = `pixel-${r}-${g}-${b}`;
  }
  ```
