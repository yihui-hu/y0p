"use client";

import { useState } from "react";
import TextBlock from "@components/TextBlock";
import Modal from "@components/Modal";
import sampleText from "@/assets/samples/sampleText";

export default function Home() {
  const [text, setText] = useState(sampleText);
  const [image, setImage] = useState("");
  const [imageHeight, setImageHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  function updateText(text: string) {
    while (text.length < 19720) {
      text += " ";
      text += text;
    }
    text = text.slice(0, 18894) + "...";
    setText(text);
  }

  function updateImage() {}

  return (
    <>
      <Modal updateText={updateText} updateImage={updateImage} />
      <TextBlock text={text} />
    </>
  );
}
