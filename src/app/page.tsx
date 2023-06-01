"use client";

import { useState, useEffect } from "react";
import { Modal, TextBlock, Loading } from "@/components/";
import { Pixel, TextStyle } from "@/interfaces/";
import { repeatText, getImageData, generateCSS } from "@/utils/";
import localFont from "next/font/local";
import sampleText from "@/samples/sampleText";

const PantasiaUnlicensedTrial = localFont({
  src: "../assets/fonts/PantasiaUnlicensedTrial-Regular.woff2",
});

const Home: React.FC = () => {
  const [text, setText] = useState<string>(sampleText);
  const [imageSrc, setImageSrc] = useState<string>("/samples/sampleImage.png");
  const [imagePixels, setImagePixels] = useState<Pixel[]>([]);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [textStyle, setTextStyle] = useState<TextStyle>(TextStyle.TRANSPARENT);
  const [loading, setLoading] = useState<boolean>(true);
  const [filesURL, setFilesURL] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    const getPixels = async () => {
      const imageData = await getImageData(imageSrc);
      setImagePixels(imageData.pixels);
      setImageHeight(imageData.imageHeight);
      setImageWidth(imageData.imageWidth);
      await generateCSS(imageData.pixels, textStyle, setFilesURL);
      setLoading(false);
    };

    getPixels();
  }, [imageSrc]);

  useEffect(() => {
    setLoading(true);

    const updateTextStyle = async () => {
      await generateCSS(imagePixels, textStyle, setFilesURL);
      setLoading(false);
    };

    updateTextStyle();
  }, [textStyle]);

  useEffect(() => {
    const updateText = async () => {
      const newText = await repeatText(text, imageWidth, imageHeight);
      setText(newText);
    };

    updateText();
  }, [text, imageWidth, imageHeight]);

  return (
    <main className={PantasiaUnlicensedTrial.className}>
      <Modal
        setText={setText}
        setImageSrc={setImageSrc}
        setTextStyle={setTextStyle}
        filesURL={filesURL}
        loading={loading}
      />
      {loading ? <Loading /> : <TextBlock text={text} image={imagePixels} />}
    </main>
  );
};

export default Home;
