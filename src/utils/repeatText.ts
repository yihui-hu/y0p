const repeatText = (
  text: string,
  imageWidth: number,
  imageHeight: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const length: number = imageWidth * imageHeight;
    while (text.length < length) {
      text += " ";
      text += text;
    }
    text = text.slice(0, length - 3) + "...";
    resolve(text);
  });
};

export default repeatText;
