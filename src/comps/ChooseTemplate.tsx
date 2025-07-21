import mediaImg from "../assets/images/template image media.svg";
import tableImg from "../assets/images/template image table.svg";
import tmImg from "../assets/images/template image text and media.svg";
import textImg from "../assets/images/template image text.svg";

type Props = {
  selectedTemplate: number; // 0 - text, 1 - media, 2 - text & media, 3 - table
  setSelectedTemplate: (type: number) => void;
};

const ChooseTemplate = ({ selectedTemplate, setSelectedTemplate }: Props) => {
  return (
    <div className="w-[296px] h-[928px] bg-white rounded-[24px] p-[16px]">
      <div className="text-[32px] text-accent font-bold text-center">
        Шаблоны
      </div>
      <div
        onClick={() => setSelectedTemplate(0)}
        className={`mt-[16px] text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == 0 ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Текст
        <img
          src={textImg}
          alt="text"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </div>
      <div
        onClick={() => setSelectedTemplate(1)}
        className={`mt-[8px] text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == 1 ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Медиа
        <img
          src={mediaImg}
          alt="media"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </div>
      <div
        onClick={() => setSelectedTemplate(2)}
        className={`mt-[8px] text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == 2 ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Текст и медиа
        <img
          src={tmImg}
          alt="text & media"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </div>
      <div
        onClick={() => setSelectedTemplate(3)}
        className={`mt-[8px] text-center text-[24px] text-accent font-bold w-[264px] h-[206px] bg-[#F2F6F7] rounded-[14px] ${selectedTemplate == 3 ? "border-[4px] border-accent p-[12px]" : "p-[16px]"}`}
      >
        Таблица
        <img
          src={tableImg}
          alt="table"
          className="w-[232px] h-[134px] mt-[16px] mx-auto"
        />
      </div>
    </div>
  );
};

export default ChooseTemplate;
