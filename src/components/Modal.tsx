"use client";

import React, { ChangeEvent, useState } from "react";
import sampleText from "@samples/sampleText";
import styles from "@styles/modal.module.css";
import { ModalProps } from "@interfaces/";

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>("");

  function toggleModal() {
    setModalOpen((modalOpen) => !modalOpen);
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function updateImageAndText(e: any) {
    e.preventDefault();
    props.updateText(textInput);
    props.updateImage(imageSrc);
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
              id="myFile"
              name="filename"
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
              onClick={(e) => updateImageAndText(e)}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
