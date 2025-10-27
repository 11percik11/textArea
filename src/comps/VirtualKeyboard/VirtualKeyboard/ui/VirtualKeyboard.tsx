import "./VirtualKeyboard.scss";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { type FC, type RefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { keyboardData } from "../data";
import { updateInputValueWithCursor } from "../lib";
import { useVirtualKeyboard } from "../provider";
import { type KeyboardType } from "../types";
import ArrowClose_Open_Svg from "../assets/icons/ArrowClose_Open.svg";
import Close_Svg from "../assets/icons/close.svg";

interface IVirtualKeyboardProps {
  show: boolean;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | HTMLDivElement | null>;
}

export const VirtualKeyboard: FC<IVirtualKeyboardProps> = ({
  show,
  inputRef,
}) => {
  const [keyboardType, setKeyboardType] = useState<KeyboardType>("rus");
  const [isCaps, setIsCaps] = useState(false);
  const [showButtonKeyBoard, setShowButtonKeyBoard] = useState(true);

  const { triggerGo } = useVirtualKeyboard();

  useEffect(() => {
    setShowButtonKeyBoard(true)
  }, [show])

  useEffect(() => {
    console.log(inputRef);
    
    if (inputRef.current) {
      switch (inputRef.current.inputMode) {
        case "numeric":
          setKeyboardType("num");
          break;

        default:
          setKeyboardType("rus");
      }
    }
  }, [inputRef.current]);

  // const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const target = e.target as HTMLElement;
  //   const { key } = target.dataset;
  //   const input = inputRef.current;

  //   console.log(input);
    

  //   if (!input || !key) return;

  //   switch (key) {
  //     case "SHIFT":
  //       setIsCaps((prev) => !prev);
  //       break;

  //     case "BACKSPACE":
  //       updateInputValueWithCursor(input, (text, start, end) => {
  //         const newStart = start ? start - 1 : start;
  //         return {
  //           value: text.slice(0, newStart) + text.slice(end),
  //           cursorPosition: newStart,
  //         };
  //       });
  //       break;

  //     case "NUM":
  //       setKeyboardType((prev) => (prev === "num" ? "rus" : "num"));
  //       break;

  //     case "LANG":
  //       setKeyboardType((prev) => (prev === "rus" ? "eng" : "rus"));
  //       break;

  //     case "SPACE":
  //       updateInputValueWithCursor(input, (text, start, end) => ({
  //         value: text.slice(0, start) + " " + text.slice(end),
  //         cursorPosition: start + 1,
  //       }));
  //       break;

  //     case "GO":
  //       input.blur();
  //       triggerGo();
  //       break;

  //     default:
  //       updateInputValueWithCursor(input, (text, start, end) => ({
  //         value: text.slice(0, start) + key + text.slice(end),
  //         cursorPosition: start + key.length,
  //       }));
  //       break;
  //   }
  // };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const target = e.target as HTMLElement;
  const { key } = target.dataset;
  const input = inputRef.current;

  if (!input || !key) return;

  switch (key) {
    case "SHIFT":
      setIsCaps((prev) => !prev);
      break;

    case "BACKSPACE":
      
      updateInputValueWithCursor(input, (text, start, end) => {
        const newStart = start ? start - 1 : start;
        return {
          value: text.slice(0, newStart) + text.slice(end),
          cursorPosition: newStart,
        };
      });
      break;

    case "NUM":
      setKeyboardType((prev) => (prev === "num" ? "rus" : "num"));
      break;

    case "LANG":
      setKeyboardType((prev) => (prev === "rus" ? "eng" : "rus"));
      break;

    // case "SPACE":
    //   updateInputValueWithCursor(input, (text, start, end) => ({
    //     value: text.slice(0, start) + `&nbsp;` + text.slice(end),
    //     cursorPosition: start + 1,
    //   }));
    //   break;

    case "SPACE":
  updateInputValueWithCursor(input, (text, start, end) => {
    const nbsp = "\u00A0"; // неразрывный пробел
    return {
      value: text.slice(0, start) + nbsp + text.slice(end),
      cursorPosition: start + 1,
    };
  });
  break;

    case "GO":
      (input as any).blur?.();
      triggerGo();
      break;

    default:
      updateInputValueWithCursor(input, (text, start, end) => ({
        value: text.slice(0, start) + key + text.slice(end),
        cursorPosition: start + key.length,
      }));
      break;
  }
};

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, pointerEvents: "none" }}
          animate={{ opacity: 1, pointerEvents: "initial" }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          className={clsx(
            "virtual-keyboard",
            `virtual-keyboard--${keyboardType}`,
            isCaps && "virtual-keyboard--isCaps",
          )}
        >
          {showButtonKeyBoard ? (
            <div
              onClick={(e) => handleClick(e)}
              onMouseDown={(e) => e.preventDefault()}
              className={"virtual-keyboard__body"}
            >
              <div className="virtual-keyboard__close-Container">
                <div
                  onClick={() => setShowButtonKeyBoard(!showButtonKeyBoard)}
                  className="virtual-keyboard__close-Container_item"
                >
                  <img
                    style={{
                      transform: showButtonKeyBoard
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                    src={ArrowClose_Open_Svg}
                    alt=""
                  />
                  {showButtonKeyBoard ? "Свернуть" : "Развернуть"}
                </div>
                <div
                  onMouseDown={(e) => e.stopPropagation()}
                  className="virtual-keyboard__close-Container_item"
                >
                  Закрыть
                  <img src={Close_Svg} alt="" />
                </div>
              </div>
              {keyboardData[keyboardType].map((row, index) => {
                return (
                  <div key={index} className={"virtual-keyboard__row"}>
                    {row.map((key, index) => (
                      <button
                        key={index}
                        data-key={isCaps ? key.toUpperCase() : key}
                        className={clsx(
                          "virtual-keyboard__key",
                          `virtual-keyboard__key--${key}`,
                        )}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            <div onMouseDown={(e) => e.preventDefault()} className="virtual-keyboard__close-Container_OnShow">
              <div
                onClick={() => setShowButtonKeyBoard(true)}
                className="virtual-keyboard__close-Container_item"
              >
                <img
                  style={{
                    transform: showButtonKeyBoard
                      ? "rotate(0deg)"
                      : "rotate(180deg)",
                  }}
                  src={ArrowClose_Open_Svg}
                  alt=""
                />
                {showButtonKeyBoard ? "Свернуть" : "Развернуть"}
              </div>
              <div
                onMouseDown={(e) => e.stopPropagation()}
                className="virtual-keyboard__close-Container_item"
              >
                Закрыть
                <img src={Close_Svg} alt="" />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    (document.getElementById("portal") as HTMLDivElement) || document.body,
  );
};
