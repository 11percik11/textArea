import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import exitIcon from "../assets/icons/exitIcon.svg";
import ExitModal from "../comps/modals/ExitModal";
import { useNavigate } from "react-router-dom";
import arrIcon from "../assets/icons/arrSimple.svg";
import ChooseTemplate from "../comps/ChooseTemplate";
import { CellEditDocuments } from "./CellEditPage/CellEditDocuments/CellEditDocuments";
import addIcon from "../assets/icons/addIcon.svg";
import type { Cell } from "../types";
import { CellEditMedia } from "./CellEditPage/CellEditMedia/CellEditMedia";
import { CellEditTable } from "./CellEditPage/CellEditTable/CellEditTable";
import { cellStore } from "../store/root";
import CellEditConfirmModal from "./CellEditPage/CellEditConfirmModal/CellEditConfirmModal";
import OverlayLoader from "../comps/OverlayLoader/OverlayLoader";
import { observer } from "mobx-react-lite";

type Props = {
  data: Cell | null;
};

const CellEditPage = ({ data }: Props) => {
  //@ts-ignore
  const mediaFilesRef = useRef(null);
  const documentFilesRef = useRef(null);

  const [timelineValue, setTimelineValue] = useState("");
  const handleTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimelineValue(event.target.value);
  };

  const [titleValue, setTitleValue] = useState(data?.title || "");
  const [textBlockValue, setTextBlockValue] = useState(data?.description || "");

  // keep a ref to the timeout
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedOnBlur = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      cellStore.updateCellTextContentHandler({
        title: titleValue,
        description: textBlockValue,
      });
    }, 300); // debounce delay in ms
  }, [titleValue, textBlockValue]);

  const handleTextBlocklineChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextBlockValue(event.target.value);
  };
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const [isTableCellExist] = useState(false);

  //const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const navigate = useNavigate();
  //const params = useParams();
  const handleBack = () => {
    navigate(-1);
  };
  const [selectedTemplate, setSelectedTemplate] = useState<Cell["type"] | null>(
    data?.type || null,
  ); //text, images, text-media, table
  const [isTimeline] = useState();

  // useEffect(() => {
  //   if (selectedTemplate === "table") {
  //     spreadsheetStore.addSpreadsheetForCurrentCell();
  //   }
  // }, [selectedTemplate]);

  const [currentCellVariantModal, setCurrentCellVariantModal] = useState<
    Cell["type"] | null
  >(null);

  const onSelectTemplate = (type: Cell["type"]) =>
    setCurrentCellVariantModal(type);

  useEffect(() => {
    console.log("wtf", cellStore.currentCell);
  }, [cellStore.currentCell]);

  const onCellVariantModalCancel = () => setCurrentCellVariantModal(null);
  const onCellVariantModalConfirm = async (variant: Cell["type"]) => {
    setCurrentCellVariantModal(null);
    const res = await cellStore.updateCellVariantHandler(variant);
    if (!res) return;
    setSelectedTemplate(variant);
  };

  const Modals = (
    <>
      <CellEditConfirmModal
        cellVariant="media"
        currentCellVariant={currentCellVariantModal}
        onNo={onCellVariantModalCancel}
        onYes={onCellVariantModalConfirm}
      />
      <CellEditConfirmModal
        cellVariant="table"
        currentCellVariant={currentCellVariantModal}
        onNo={onCellVariantModalCancel}
        onYes={onCellVariantModalConfirm}
      />
      <CellEditConfirmModal
        cellVariant="text"
        currentCellVariant={currentCellVariantModal}
        onNo={onCellVariantModalCancel}
        onYes={onCellVariantModalConfirm}
      />
      <CellEditConfirmModal
        cellVariant="text-media"
        currentCellVariant={currentCellVariantModal}
        onNo={onCellVariantModalCancel}
        onYes={onCellVariantModalConfirm}
      />
    </>
  );

  return (
    <div className="animate-appear w-full h-full p-[32px]">
      {Modals}
      <OverlayLoader isLoading={cellStore.isLoading} />
      <div className="flex items-center gap-[16px]">
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
      </div>
      <div className="flex gap-[16px] mt-[16px]">
        <ChooseTemplate
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={onSelectTemplate}
        />

        {selectedTemplate && (
          <>
            <div
              style={{
                width: `${selectedTemplate == "table" ? 1544 : 1232}px`,
              }}
              className={`h-[928px]`}
            >
              <div className="w-[1232px] h-[92px] flex gap-[16px]">
                <div className="w-full h-full rounded-[24px] bg-white p-[24px] text-left">
                  <span className="text-[16px] text-accent font-bold">
                    Название{!isTimeline && "*"}
                  </span>
                  <input
                    onChange={handleTitleChange}
                    onBlur={debouncedOnBlur}
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
                hidden={
                  selectedTemplate !== "text-media" &&
                  selectedTemplate !== "media"
                }
                className="w-[1232px] min-h-[160px] max-h-[600px] rounded-[24px] bg-white mt-[16px] p-[24px]"
              >
                {data && (
                  <CellEditMedia images={data.images} ref={mediaFilesRef} />
                )}
              </div>
              <div
                hidden={
                  selectedTemplate !== "text" &&
                  selectedTemplate !== "text-media"
                }
                className={`w-[1232px] mt-[16px] ${selectedTemplate === "text" ? "h-[820px]" : "h-[644px]"} min-h-[516px] rounded-[24px] bg-white p-[24px]`}
              >
                <span className="text-[16px] text-accent font-bold w-[1184px] h-[16px]">
                  Текст
                </span>
                <textarea
                  wrap="soft"
                  onBlur={debouncedOnBlur}
                  onChange={handleTextBlocklineChange}
                  value={textBlockValue}
                  className="w-full h-full text-text outline-none text-wrap"
                />
              </div>

              {selectedTemplate === "table" && <CellEditTable />}
            </div>

            <div
              className="w-[296px] h-[928px]"
              hidden={selectedTemplate === "table"}
            >
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
              <CellEditDocuments
                files={data?.files || []}
                ref={documentFilesRef}
              />
            </div>
          </>
        )}
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

export default observer(CellEditPage);
