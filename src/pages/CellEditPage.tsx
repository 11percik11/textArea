import { useState, type ChangeEvent } from "react";
import exitIcon from "../assets/icons/exitIcon.svg";
import ExitModal from "../comps/modals/ExitModal";
import { useNavigate } from "react-router-dom";
import arrIcon from "../assets/icons/arrSimple.svg";
import ChooseTemplate from "../comps/ChooseTemplate";
import FilesAdder from "../comps/FilesAdder";
import addIcon from "../assets/icons/addIcon.svg";
import type { Cell } from "../types";
import axios from "axios";

type Props = {
  data: Cell | null;
};

const CellEditPage = ({ data }: Props) => {
  //@ts-ignore
  const apiUrl = window.__API_CONFIG__.apiUrl;
  const [isLoading, setIsLoading] = useState(false);
  const applyCell = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", data?.id?.toString() || "");
    formData.append("title", titleValue || "");
    formData.append("description", textBlockValue || "");
    formData.append("type", selectedTemplate);
    formData.append("keep_images", "");
    formData.append("keep_files", "");
    formData.append("images", "");
    formData.append("files", "");
    axios
      .post(`${apiUrl}api/cells`, formData, {
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const [titleValue, setTitleValue] = useState(data?.title);
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const [timelineValue, setTimelineValue] = useState("");
  const handleTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimelineValue(event.target.value);
  };

  const [textBlockValue, setTextBlockValue] = useState(data?.description);
  const handleTextBlocklineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextBlockValue(event.target.value);
  };

  const [media, setMedia] = useState(data?.images || []);
  const [files, setFiles] = useState(data?.files || []);
  const [newMedia, setNewMedia] = useState<any>([]);
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const [isTableCellExist] = useState(false);

  //const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const navigate = useNavigate();
  //const params = useParams();
  const handleBack = () => {
    navigate(-1);
  };
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    data?.type || "text",
  ); //text, media, t&m, table
  const [isTimeline] = useState();
  return (
    <div className="animate-appear w-full h-full p-[32px]">
      {isLoading && (
        <div className="fixed mx-auto left-0 right-0 my-auto top-0 bottom-0 size-[100px] rounded-full border-[17px] border-dotted border-accent animate-spin" />
      )}
      <div className="flex justify-between items-center gap-[16px]">
        <button
          onClick={() => setExitModalOpen(true)}
          className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
        >
          <img src={exitIcon} alt="exit" className="size-[32px]" />
        </button>
        <button
          onClick={handleBack}
          className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
        >
          <img src={arrIcon} alt="back" className="size-[32px]" />
        </button>
        <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
          Редактирование ячейки
        </div>
        <button
          onClick={applyCell}
          disabled={false}
          className="w-[296px] h-[72px] rounded-[24px] text-white text-[24px] font-semibold flex items-center justify-center bg-accent disabled:opacity-[20%]"
        >
          Сохранить
        </button>
      </div>
      <div className="flex gap-[16px] mt-[16px]">
        <ChooseTemplate
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={(type) => setSelectedTemplate(type)}
        />
        <div className="w-[1232px] h-[928px]">
          <div className="w-[1232px] h-[92px] flex gap-[16px]">
            <div className="w-full h-full rounded-[24px] bg-white p-[24px] text-left">
              <span className="text-[16px] text-accent font-bold">
                Название{!isTimeline && "*"}
              </span>
              <input
                onChange={handleTitleChange}
                value={titleValue}
                placeholder="Укажите название"
                className="w-full h-[20px] mt-[8px] text-text"
              />
            </div>
            <div
              hidden={!isTimeline}
              className="w-full h-full rounded-[24px] bg-white p-[24px] text-left"
            >
              <span className="text-[16px] text-accent font-bold">
                Значение*
              </span>
              <input
                onChange={handleTimelineChange}
                value={timelineValue}
                placeholder="Укажите временной период"
                className="w-full h-[20px] mt-[8px] text-text"
              />
            </div>
          </div>
          <div
            hidden={selectedTemplate !== "t&m" && selectedTemplate !== "media"}
            className="w-[1232px] min-h-[160px] max-h-[288px] rounded-[24px] bg-white mt-[16px] p-[24px]"
          >
            <span className="text-[16px] text-accent font-bold">Медиа</span>
            <div className="w-[1184px] h-[80px] mt-[16px]">
              <div className="w-[413px] h-[16px] flex gap-[12px]">
                {[
                  ".jpeg",
                  ".png",
                  ".mp4",
                  ".mov",
                  ".avi",
                  ".webp",
                  ".webm",
                  ".gif",
                ].map((format, index) => (
                  <div
                    key={index}
                    className="font-bold text-[16px] text-[#C9C9C9]"
                  >
                    {format}
                  </div>
                ))}
              </div>
              <button className="disabled:opacity-[20%] mt-[8px] w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center">
                <label>
                  <input
                    accept=".png, .jpeg, .mp4, .mov, .avi, .jpg, .wepb, .webm, .gif"
                    hidden={false}
                    id="imgInput"
                    type="file"
                    className="xl:size-[396px] lg:size-[436px] size-[328px] absolute opacity-0"
                    onChange={(event) => {
                      if (
                        event.target.files &&
                        event.target.files[0].size > 8388608
                      )
                        alert("Слишком большой файл");
                      else
                        setNewMedia((prevNewMedia: any) => [
                          ...prevNewMedia,
                          ...Array.from(event.target.files!),
                        ]);
                    }}
                  />
                </label>
                <img src={addIcon} alt="add" className="size-[32px]" />
                Добавить
              </button>
            </div>
          </div>
          <div
            hidden={selectedTemplate !== "text" && selectedTemplate !== "t&m"}
            className={`w-[1232px] mt-[16px] h-fill min-h-[516px] rounded-[24px] bg-white p-[24px]`}
          >
            <span className="text-[16px] text-accent font-bold w-[1184px] h-[16px]">
              Текст
            </span>
            <input
              onChange={handleTextBlocklineChange}
              value={textBlockValue}
              className="w-full h-full text-text"
            />
          </div>
        </div>
        <div className="w-[296px] h-[928px]">
          <div className="w-[296px] h-[172px] bg-white rounded-[24px] p-[16px]">
            <div className="text-center mx-auto text-accent text-[32px] font-bold">
              Таблица
            </div>
            <button
              disabled={!isTableCellExist}
              className="disabled:opacity-[20%] mt-[16px] mx-auto w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center"
            >
              <img src={addIcon} alt="add" className="size-[32px]" />
              Добавить
            </button>
            <div className="mt-[16px] text-center mx-auto text-[16px] text-stroke font-bold">
              Сначала создайте ячейку
            </div>
          </div>
          <FilesAdder files={files || []} />
        </div>
      </div>
      {isExitModalOpen && (
        <ExitModal
          onNo={() => setExitModalOpen(false)}
          onYes={() => {
            setExitModalOpen(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
};

export default CellEditPage;
