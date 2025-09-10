import { useState } from "react";
import Key from "./Key";
import close from "../assets/images/icons/close.svg";

type Props = {
  opened: boolean;
  enterButton: (letter: string) => void;
  onClose: () => void;
  onBackspace: () => void;
};

export default function Keyboard({
  opened,
  enterButton,
  onClose,
  onBackspace,
}: Props) {
  const [language, setLanguage] = useState("ABC");
  const [uppercase, setUppercase] = useState(0);
  const [isNumbersShown, setNumbersShown] = useState(false);
  return (
    <div
      className={`transition ${opened && "translate-y-[-2273px]"} bottom-[-2000px] duration-700 fixed absolute left-0 right-0 z-10 font-montserrat font-medium text-[18px]`}
    >
      <div
        className={`mx-auto w-[1840px] h-[652px] rounded-[48px] bg-white font-montserrat text-[#373737] justify-center items-center text-center px-[30.12px] pt-[48px] font-normal`}
      >
        <div className="mx-auto justify-center items-center w-full h-[76px] divide-x-2 flex divide-gray-third">
          <div
            onClick={() => enterButton("@gmail.com")}
            className="w-[276px] font-normal text-[36px] text-gray-primary leading-[100%] tracking-[-0.86px] text-center"
          >
            @gmail.com
          </div>
          <div
            onClick={() => enterButton("@mail.ru")}
            className="w-[276px] font-normal text-[36px] text-gray-primary leading-[100%] tracking-[-0.86px] text-center"
          >
            @mail.ru
          </div>
          <div
            onClick={() => enterButton("@yandex.ru")}
            className="w-[276px] font-normal text-[36px] text-gray-primary leading-[100%] tracking-[-0.86px] text-center"
          >
            @yandex.ru
          </div>
        </div>
        <div className="flex gap-[16px] justify-center items-center text-center mt-[48px]">
          {language === "АБВ" &&
            !isNumbersShown &&
            ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[130px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    setUppercase(0);
                  }}
                />
              ),
            )}
          {language === "ABC" &&
            !isNumbersShown &&
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[130px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    if (uppercase !== 2) setUppercase(0);
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
                  className="w-[130px]"
                  clickHandler={() => {
                    enterButton(text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
        </div>
        <div className="flex gap-[16px] justify-center items-center text-center mt-[16px]">
          {language === "АБВ" &&
            !isNumbersShown &&
            ["ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[130px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
          {language === "ABC" &&
            !isNumbersShown &&
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[130px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            ["$", "!", ";", "?", "=", "@", "(", ")"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={text}
                  type="symbol"
                  className="w-[158.5px]"
                  clickHandler={() => {
                    enterButton(text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
        </div>
        <div className="flex gap-[16px] justify-center items-center text-center mt-[16px]">
          <Key
            shift={uppercase}
            text=""
            type="shift"
            className={`${!uppercase && "bg-blue-bg active:bg-light-blue"} w-[208px]`}
            clickHandler={() =>
              setUppercase(uppercase !== 2 ? uppercase + 1 : 0)
            }
          />
          {language === "АБВ" &&
            !isNumbersShown &&
            ["я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "ё"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[130px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
          {language === "ABC" &&
            !isNumbersShown &&
            ["z", "x", "c", "v", "b", "n", "m"].map(
              (text: string, index: number) => (
                <Key
                  key={index}
                  text={uppercase ? text.toUpperCase() : text}
                  type="symbol"
                  className="w-[130px]"
                  clickHandler={() => {
                    enterButton(uppercase ? text.toUpperCase() : text);
                    if (uppercase !== 2) setUppercase(0);
                  }}
                />
              ),
            )}
          {isNumbersShown &&
            [".", "_", "-", "+"].map((text: string, index: number) => (
              <Key
                key={index}
                text={text}
                type="symbol"
                className="w-[237.5px]"
                clickHandler={() => {
                  enterButton(text);
                  if (uppercase !== 2) setUppercase(0);
                }}
              />
            ))}
          <Key
            text={""}
            type="backspace"
            className="w-[206px] bg-blue-bg active:bg-light-blue"
            clickHandler={() => {
              onBackspace();
            }}
          />
        </div>
        <div className="flex gap-[16px] justify-center items-center text-center mt-[16px] font-medium">
          <Key
            text={!isNumbersShown ? "&123" : language}
            type="nums"
            className="w-[280px] bg-blue-bg active:bg-light-blue"
            clickHandler={() => setNumbersShown(!isNumbersShown)}
          />
          <Key
            text={language === "ABC" ? "Space" : "Пробел"}
            type="symbol"
            className={`${language === "АБВ" && !isNumbersShown ? "w-full" : "w-[852px]"} font-medium`}
            clickHandler={() => {
              enterButton(" ");
              if (uppercase !== 2) setUppercase(0);
            }}
          />
          <Key
            text=""
            type="lang"
            className="w-[280px] bg-blue-bg active:bg-light-blue"
            clickHandler={() => {
              setLanguage(`${language === "АБВ" ? "ABC" : "АБВ"}`);
            }}
          />
        </div>
      </div>
      <div
        onClick={onClose}
        className="mt-[40px] w-[176px] h-[112px] rounded-[48px] bg-white mx-auto flex justify-center items-center"
      >
        <img src={close} alt="close" className="mx-auto" />
      </div>
    </div>
  );
}
