"use client";

import React, { useState } from "react";
import sampleText from "@samples/sampleText";
import styles from "@styles/modal.module.css";
import { ModalProps } from "@interfaces/";

export default function Modal(props: ModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [textInput, setTextInput] = useState("");

  function toggleModal() {
    setModalOpen((modalOpen) => !modalOpen);
  }

  function updateImageAndText(e: any) {
    e.preventDefault();
    props.updateText(textInput);
    props.updateImage();
  }

  return (
    <>
      <button className={styles.modalButton} onClick={toggleModal}>
        i
      </button>
      {modalOpen && (
        <div className={styles.modalContainer}>
          <form className={styles.modalForm}>
            <input
              type="file"
              id="myFile"
              name="filename"
              onChange={(e) => setImage("")}
            />
            <textarea
              className={styles.modalInput}
              placeholder={sampleText.slice(0, 800) + "..."}
              rows={4}
              cols={50}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button
              className={styles.modalUpdateButton}
              onClick={(e) => updateImageAndText(e)}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
}
