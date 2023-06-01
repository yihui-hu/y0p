"use client";

import React, { ChangeEvent, useState, useRef } from "react";
import sampleText from "@/samples/sampleText";
import styles from "@/styles/modal.module.css";
import { ModalProps, TextStyle } from "@/interfaces/";

const Modal: React.FC<ModalProps> = ({
  setText,
  setImageSrc,
  setTextStyle,
  loading,
  filesURL,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  function toggleModal() {
    setModalOpen((modalOpen) => !modalOpen);
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function updateText(e: any) {
    e.preventDefault();
    if (textInput !== "") setText(textInput);
  }

  function updateTextStyle(textStyle: string) {
    switch (textStyle) {
      case "transparent":
        setTextStyle(TextStyle.TRANSPARENT);
        break;
      case "inverse":
        setTextStyle(TextStyle.INVERTED);
        break;
      case "veiled":
        setTextStyle(TextStyle.VEILED);
        break;
      default:
        setTextStyle(TextStyle.TRANSPARENT);
        break;
    }
  }
  
  const handleClick = (e: any) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  };

  function getStaticFiles(e: any) {
    e.preventDefault();

    // Create a link element to download the CSS file
    const linkElement = document.createElement("a");
    linkElement.href = filesURL;
    linkElement.download = "pixels.css";

    // Simulate a click event to trigger the download
    linkElement.click();

    const htmlBlob = new Blob([document.documentElement.outerHTML], {
      type: "text/html",
    });
    const htmlURL = URL.createObjectURL(htmlBlob);
    const linkElement2 = document.createElement("a");
    linkElement2.href = htmlURL;
    linkElement2.download = "index.html";

    // Simulate a click event to trigger the download
    linkElement2.click();
  }

  return (
    <>
      <button className={styles.modalToggle} onClick={toggleModal}>
        i
      </button>
      {modalOpen && (
        <div className={styles.modalContainer}>
          <form className={styles.modalForm}>
            <button
              className={styles.modalButton}
              onClick={(e) => handleClick(e)}
            >
              Upload image
            </button>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={hiddenFileInput}
            />
            <textarea
              className={styles.modalInput}
              placeholder={sampleText.slice(0, 800) + "..."}
              rows={4}
              cols={50}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <select
              id="dropdown"
              onChange={(e) => updateTextStyle(e.target.value)}
            >
              <option value="transparent">Transparent</option>
              <option value="inverse">Inverted</option>
              <option value="veiled">Veiled</option>
            </select>
            <button
              className={styles.modalButton}
              onClick={(e) => updateText(e)}
              disabled={loading ? true : false}
            >
              Update text
            </button>
            <button
              className={styles.modalButton}
              onClick={(e) => getStaticFiles(e)}
              disabled={loading ? true : false}
            >
              Download static files
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
