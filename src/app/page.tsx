/*
 * This file contains the structure and logic for the main page of the site.
 * Type is set in Pantasia by Wei Huang.
 *
 */

"use client";

import { useState, useEffect } from "react";
import { Modal, TextBlock, Loading } from "@/components/";
import { Pixel, TextStyle, ImageSize } from "@/interfaces/";
import { repeatText, getImageData, generateCSS } from "@/utils/";
import localFont from "next/font/local";
import sampleText from "@/samples/sampleText";

const PantasiaUnlicensedTrial = localFont({
  src: "../assets/fonts/PantasiaUnlicensedTrial-Regular.woff2",
});

const Home: React.FC = () => {
  const [inputText, setInputText] = useState<string>(sampleText);
  const [text, setText] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("/samples/sampleImage.png");
  const [imgPixels, setImgPixels] = useState<Pixel[]>([]);
  const [imgSize, setImgSize] = useState<ImageSize>({ width: 0, height: 0 });
  const [imgScale, setImgScale] = useState<number>(140);
  const [textStyle, setTextStyle] = useState<TextStyle>(TextStyle.TRANSPARENT);
  const [loading, setLoading] = useState<boolean>(true);

  const updatePixels = async () => {
    setLoading(true);
    const imageData = await getImageData(imgSrc, imgScale);
    setImgPixels(imageData.pixels);
    setImgSize({ width: imageData.width, height: imageData.height });
    await generateCSS(imageData.pixels, textStyle);
  };

  const updateText = async () => {
    setLoading(true);
    const newText = await repeatText(inputText, imgSize);
    setText(newText);
  };

  const updateTextStyle = async () => {
    setLoading(true);
    await generateCSS(imgPixels, textStyle);
  };

  useEffect(() => {
    updatePixels();
    setTimeout(() => setLoading(false), 300);
  }, [imgSrc]);

  useEffect(() => {
    updateTextStyle();
    setLoading(false);
  }, [textStyle]);

  useEffect(() => {
    updateText();
    setLoading(false);
  }, [inputText, imgSize]);

  useEffect(() => {
    updatePixels();
    updateText();
    setLoading(false);
  }, [imgScale])

  return (
    <main className={PantasiaUnlicensedTrial.className}>
      <Modal
        setText={setInputText}
        setImgSrc={setImgSrc}
        setTextStyle={setTextStyle}
        setImgScale={setImgScale}
        imgScale={imgScale}
        loading={loading}
      />
      {loading ? (
        <Loading />
      ) : (
        <TextBlock text={text} image={imgPixels} imgScale={imgScale} />
      )}
    </main>
  );
};

export default Home;
