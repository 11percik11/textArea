import clsx from "clsx";
import mediaImg from "../assets/images/template image media.svg";
import tableImg from "../assets/images/template image table.svg";
import tmImg from "../assets/images/template image text and media.svg";
import textImg from "../assets/images/template image text.svg";
import type { Cell } from "../types";
import style from "./ChooseTemplate.module.scss";
import { observer } from "mobx-react-lite";

type Props = {
  selectedTemplate: Cell["type"];
  setSelectedTemplate: (type: Cell["type"]) => void;
};

const ChooseTemplate = ({ selectedTemplate, setSelectedTemplate }: Props) => {
  return (
    <div
      className={clsx(
        "w-[296px] bg-white rounded-[24px] p-[16px]",
        style.ChooseTemplate,
      )}
    >
      <div className="text-[32px] text-accent font-bold text-center">
        Шаблоны
      </div>
      <button
        disabled={selectedTemplate === "text"}
        onClick={() => setSelectedTemplate("text")}
        className={`mt-[16px] text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == "text" ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Текст
        <img
          src={textImg}
          alt="text"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </button>
      <button
        disabled={selectedTemplate === "media"}
        onClick={() => setSelectedTemplate("media")}
        className={`mt-[8px] text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == "media" ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Медиа
        <img
          src={mediaImg}
          alt="media"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </button>
      <button
        disabled={selectedTemplate === "text-media"}
        onClick={() => setSelectedTemplate("text-media")}
        className={`mt-[8px] text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == "text-media" ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Текст и медиа
        <img
          src={tmImg}
          alt="text & media"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </button>
      <button
        disabled={selectedTemplate === "table"}
        onClick={() => setSelectedTemplate("table")}
        className={`mt-[8px] bg-red text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == "table" ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Таблица
        <img
          src={tableImg}
          alt="table"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </button>
    </div>
  );
};

export default observer(ChooseTemplate);


