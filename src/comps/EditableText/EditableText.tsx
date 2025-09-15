import React, { useState, useRef } from "react";
import styles from "./EditableText.module.scss";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
//import Keyboard from "../modals/Keyboard/Keyboard";

type EditableTextProps = {
  value: string;
  isLoading: boolean;
  onFinish: (nextValue: string) => Promise<void>;
};

const EditableText: React.FC<EditableTextProps> = ({
  value,
  isLoading,
  onFinish,
}) => {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  //const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const handleBlur = async () => {
    setEditing(false);
    if (localValue !== value) {
      await onFinish(localValue);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  if (isLoading) {
    return (
      <OverlayLoader
        isLoading={isLoading}
        fullscreen={false}
        spinnerSizePx={30}
        overlayColor="transparent"
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      {editing ? (
        <div
          onBlur={handleBlur}
          >
        <input
          ref={inputRef}
          className={styles.input}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
        </div>
      ) : (
        <span>{value}</span>
      )}
      <button
        type="button"
        onClick={handleEditClick}
        className={styles.editBtn}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
};

export default EditableText;
