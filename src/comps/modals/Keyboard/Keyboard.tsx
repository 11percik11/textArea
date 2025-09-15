/* import { useState } from "react";
import Key from "./Key";
import close from "../../../assets/icons/bigClose.svg"
import openIcon from "../../../assets/icons/Keyboard.svg"

type Props = {
  enterButton: (letter: string) => void;
  onBackspace: () => void;
  onFocusChange: (focus: boolean) => void;
  onClick: () => void;
};

export default function Keyboard({
  enterButton,
  onBackspace,
  //onFocusChange,
  onClick
}: Props) {
  const [uppercase, setUppercase] = useState(0);
  const [isNumbersShown, setNumbersShown] = useState(false);
  //const [isFocused, setFocused] = useState(false);
  const [opened, setOpened] = useState(false);
  return (
    <div
      onClick={onClick}
      >
    {
      !opened && 
        <button 
          onClick={() => setOpened(true)}
          className="w-[140px] h-[24px] rounded-t-[15px] bg-white flex justify-center items-center z-100 fixed bottom-0 left-0 right-0 mx-auto">
          <img src={openIcon} alt="open keyboard" className="size-[24px]" />
        </button>
    }
    <div
      className={`transition ${opened && "translate-y-[-388px]"} bg-[#FAFAFA] rounded-[24px] bottom-[-364px] w-[920px] h-[364px] duration-700 fixed absolute left-0 right-0 z-10 font-medium mx-auto p-[24px]`}
    >
      <div
        className={`mx-auto w-[872px] h-[216px] text-[#2D3744] justify-center items-center text-center font-normal`}
      >
        <div className="flex gap-[8px] justify-center items-center text-center">
          {!isNumbersShown &&
            ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(0);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
        </div>
        <div className="flex gap-[8px] justify-center items-center text-center mt-[8px]">
          {!isNumbersShown &&
            ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            ["-", "/", ":", ";", "(", ")", "&", "@", '"'].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
        </div>
        <div className="flex gap-[8px] justify-center items-center text-center mt-[8px]">
          <Key
            shift={uppercase}
            text=""
            type="shift"
            className={`${!uppercase && "bg-[#F1852233] active:bg-[#F185220D]"} w-[104px]`}
            clickHandler={() =>
              setUppercase(uppercase !== 2 ? uppercase + 1 : 0)
            }
          />
          {!isNumbersShown &&
            ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[65px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            [".", ",", "?", "!", "`"].map((text: string, index: number) => (
              <Key
                key={index}
                text={text}
                type="symbol"
                className="w-[93.4px]"
                clickHandler={() => {
                  enterButton(text);
                  if (uppercase !== 2) setUppercase(0);
                }}
              />
            ))}
          <Key
            text={""}
            type="backspace"
            className="w-[103px] bg-[#F1852233] active:bg-[#F185220D]"
            clickHandler={() => {
              onBackspace();
            }}
          />
        </div>
        <div className="flex gap-[8px] justify-center items-center text-center mt-[8px] font-medium">
          <Key
            text={!isNumbersShown ? "&123" : "АБВ"}
            type="nums"
            className="w-[140px] bg-[#F1852233] active:bg-[#F185220D]"
            clickHandler={() => setNumbersShown(!isNumbersShown)}
          />
          <Key
            text={"Пробел"}
            type="symbol"
            className={`${isNumbersShown ? "w-[574px]" : "w-[724px]"} font-medium`}
            clickHandler={() => {
              enterButton(" ");
              if (uppercase !== 2) setUppercase(0);
            }}
          />
        </div>
      </div>
      <div
        onClick={() => setOpened(false)}
        className="mt-[20px] w-[88px] h-[56px] rounded-[24px] bg-white mx-auto flex justify-center items-center"
      >
        <img src={close} alt="close" className="mx-auto" />
      </div>
    </div>
    </div>
  );
}
 */