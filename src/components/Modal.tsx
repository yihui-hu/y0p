"use client";

import React, { ChangeEvent, useState } from "react";
import sampleText from "@/samples/sampleText";
import styles from "@/styles/modal.module.css";
import { ModalProps } from "@/interfaces/";

const Modal: React.FC<ModalProps> = ({ setText, setImageSrc, loading }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");

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
              accept="image/*"
              onChange={handleImageUpload}
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
              onClick={(e) => updateText(e)}
              disabled={loading ? true : false}
            >
              Update text
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
