import { Pixel } from "@/interfaces";

// @TODO: generate CSS based on type
// @TODO: get custom type (transparent, inverse, color value, lighter, darker)
const generateCSS = (pixels: Pixel[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const uniqueColors = new Set<string>();

    pixels.forEach((p) => {
      const pixelColor = `p-${p.r}-${p.g}-${p.b}`;
      uniqueColors.add(pixelColor);
    });

    const colorsArray = Array.from(uniqueColors);

    const cssRules = colorsArray
      .map((pixel, index) => {
        const splitPixel = pixel.split("-");
        const r = splitPixel[1];
        const g = splitPixel[2];
        const b = splitPixel[3];
        const r_inverse = (255 - parseInt(r)).toString();
        const g_inverse = (255 - parseInt(g)).toString();
        const b_inverse = (255 - parseInt(b)).toString();
        return `.p-${r}-${g}-${b}::selection { 
                  color: rgb(${r}, ${g}, ${b}, 0);
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
    resolve();
  });
};

export default generateCSS;