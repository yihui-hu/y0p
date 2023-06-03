/*
 * This file contains the component for displaying a modal, allowing users
 * to provide their own text to display or change the image source and text
 * styling. Also allows users to change the scale of the image and download
 * the page as a standalone HTML file with its own internal stylesheet.
 *
 */

"use client";

import React, { ChangeEvent, useState, useRef, useMemo } from "react";
import ReactSlider from "react-slider";
import sampleText from "@/samples/sampleText";
import styles from "@/styles/modal.module.css";
import { debounce } from "lodash";
import { ModalProps, TextStyle } from "@/interfaces/";

const Modal: React.FC<ModalProps> = ({
  setText,
  setImgSrc,
  setTextStyle,
  setImgScale,
  imgScale,
  loading,
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
      reader.onload = () => setImgSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleTextInput(e: any) {
    setTextInput(e.target.value);
    debouncedChangeHandler(e.target.value);
  }

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value) => {
        setText(value);
      }, 400),
    []
  );

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

  function generateHTML(e: any) {
    e.preventDefault();

    const html: Document = document.implementation.createHTMLDocument("yop");
    const styles: HTMLElement | null = document.getElementById("styles");
    const body: HTMLElement | null = document.getElementById("textBlock");

    var meta = document.createElement("meta");
    meta.httpEquiv = "Content-type";
    meta.content = "text/html; charset=UTF-8";

    if (styles) {
      html.head.append(styles.cloneNode(true));
    }
    if (body) {
      html.body.append(body.cloneNode(true));
    }
    html.head.append(meta);

    const htmlBlob = new Blob([html.documentElement.outerHTML], {
      type: "text/html",
    });
    const htmlURL = URL.createObjectURL(htmlBlob);
    const link = document.createElement("a");
    link.href = htmlURL;
    link.download = "index.html";
    link.click();
  }

  return (
    <>
      <button className={styles.modalToggle} onClick={toggleModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={styles.icon}
        >
          <path
            fill-rule="evenodd"
            d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clip-rule="evenodd"
          />
        </svg>
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
              onChange={handleTextInput}
            />
            <select
              id="dropdown"
              className={styles.select}
              onChange={(e) => updateTextStyle(e.target.value)}
            >
              <option value="transparent" selected>
                Transparent
              </option>
              <option value="inverse">Inverted</option>
              <option value="veiled">Veiled</option>
            </select>
            <ReactSlider
              onAfterChange={(e, i) => setImgScale(e)}
              onSliderClick={(e) => setImgScale(e)}
              min={30}
              max={180}
              defaultValue={imgScale}
              className={styles.slider}
              markClassName={styles.mark}
              thumbClassName={styles.thumb}
              trackClassName={styles.track}
              renderThumb={(props) => <div {...props}></div>}
            />
            <button
              className={styles.modalButton}
              onClick={(e) => generateHTML(e)}
              disabled={loading ? true : false}
            >
              Download HTML file
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
