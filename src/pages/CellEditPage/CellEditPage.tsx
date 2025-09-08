import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import exitIcon from "../../assets/icons/exitIcon.svg";
import ExitModal from "../../comps/modals/ExitModal";
import { useNavigate } from "react-router-dom";
import arrIcon from "../../assets/icons/arrSimple.svg";
import ChooseTemplate from "../../comps/AdminTable/ChooseTemplate/ChooseTemplate";
import { CellEditDocuments } from "./CellEditDocuments/CellEditDocuments";
import addIcon from "../../assets/icons/addIcon.svg";
import type { Cell } from "../../types";
import { CellEditMedia } from "./CellEditMedia/CellEditMedia";
import { CellEditTable } from "./CellEditTable/CellEditTable";
import CellEditConfirmModal from "./CellEditConfirmModal/CellEditConfirmModal";
import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
import { observer } from "mobx-react-lite";
//import { useGetCurrentCell } from "./hooks/useGetCurrentCell";
//import { tableStore } from "../AdminPage/SpreadsheetStore";
//import { toJS } from "mobx";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";

type Props = { data: SpreadsheetCellEntity };

const CellEditPage = ({ data }: Props) => {
  const [timelineValue, setTimelineValue] = useState("");
  const handleTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimelineValue(event.target.value);
  };
  console.log(data);
  const [titleValue, setTitleValue] = useState(data?.title || "");
  const [textBlockValue, setTextBlockValue] = useState(data?.description || "");

  // keep a ref to the timeout
  //@ts-ignore
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedOnBlur = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      data.updateCellTextContentHandler({
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
  //const [isTableCellExist] = useState(false);

  //const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const navigate = useNavigate();
  //const params = useParams();
  const handleBack = () => {
    navigate(-1);
  };
  // const [data.type, setSelectedTemplate] = useState<Cell["type"] | null>(
  //   data?.type || null,
  // ); //text, images, text-media, table
  const [isTimeline] = useState();

  const [currentCellVariantModal, setCurrentCellVariantModal] = useState<
    Cell["type"] | null
  >(null);

  const onSelectTemplate = (type: Cell["type"]) =>
    setCurrentCellVariantModal(type);

  const onCellVariantModalCancel = () => setCurrentCellVariantModal(null);
  const onCellVariantModalConfirm = async (variant: Cell["type"]) => {
    setCurrentCellVariantModal(null);
    await data.updateType(variant);
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

  const toTable = () => {
    const cellIdToSpreadsheet: Record<string, number> = {
      ["177"]: -1,
      ["-10"]: -2,
      ["-11"]: -3,
      ["-12"]: -4,
    };
    const spreadsheetId = cellIdToSpreadsheet[data.id.toString()];
    navigate(`/admin/table?id=${spreadsheetId}`);
  };

  const hasMockButton = ["177", "-10", "-11", "-12"].some(
    (value) => value === data.id.toString(),
  );

  return (
    <div className="animate-appear w-full h-full p-[32px]">
      {Modals}
      <OverlayLoader isLoading={data.isLoading} />
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
          selectedTemplate={data.type}
          setSelectedTemplate={onSelectTemplate}
        />

        {data.type && (
          <>
            <div
              style={{
                width: `${data.type == "table" ? 1544 : 1232}px`,
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
                hidden={data.type !== "text-media" && data.type !== "media"}
                className="w-[1232px] min-h-[160px] max-h-[600px] rounded-[24px] bg-white mt-[16px] p-[24px]"
              >
                {data && <CellEditMedia cell={data} />}
              </div>
              <div
                hidden={data.type !== "text" && data.type !== "text-media"}
                className={`w-[1232px] mt-[16px] ${data.type === "text" ? "h-[820px]" : "h-[644px]"} min-h-[516px] rounded-[24px] bg-white p-[24px]`}
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

              {data.type === "table" && <CellEditTable data={data} />}
            </div>

            <div className="w-[296px] h-[928px]" hidden={data.type === "table"}>
              <div className={`w-[296px] ${!hasMockButton ? "h-[124px]" : `${titleValue!=="" ? "h-[136px]" : "h-[172px]"}`} bg-white rounded-[24px] p-[16px]`}>
                <div className="text-center mx-auto text-accent text-[32px] font-bold">
                  Таблица
                </div>
                <button
                onClick={toTable}
                disabled={titleValue==="" && !hasMockButton}
                >

                </button>
                <button
                  onClick={toTable}
                  disabled={titleValue==="" && !hasMockButton}
                  className="disabled:opacity-[20%] mt-[16px] mx-auto w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center"
                >
                  {!hasMockButton ? (
                    <div>Перейти</div>
                  ) : (
                    <>
                      <img src={addIcon} alt="add" className="size-[32px]" />
                      Добавить
                    </>
                  )}
                </button>
                <div>

                </div>
              </div>
              <CellEditDocuments cell={data} height={`${!hasMockButton ? "h-[740px]" : `${titleValue!=="" ? "h-[776px]" : "h-[740px]"}`}`}/>
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
