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
import printIcon from "../../assets/icons/printIcon.svg"
//import { useGetCurrentCell } from "./hooks/useGetCurrentCell";
//import { tableStore } from "../AdminPage/SpreadsheetStore";
//import { toJS } from "mobx";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
import { useReactToPrint } from "react-to-print";

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
  const printRef = useRef(null);
  const onPrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Редактирование ячейки",
    //onAfterPrint: handleAfterPrint,
    //onBeforePrint: handleBeforePrint,
        pageStyle: "{ size: 0 }"
  });

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
    if (!!data.children) navigate(`/admin/table?id=${data.children.id}`);
    else console.log("error")
  };
  const deleteTable = () => {
    console.log("cant delete")
  };
  const createTable = () => {
    setHasChildTable(true);
    
  };

  const [hasChildTable, setHasChildTable] = useState(!!data.children);
  console.log(data)
  return (
    <div  className="animate-appear w-full h-full p-[32px]">
      {Modals}
      <OverlayLoader isLoading={data.isLoading} />
      <div className="flex items-center gap-[16px] relative">
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
          onClick={onPrint}
          className="size-[72px] rounded-[24px] bg-white absolute right-0 flex items-center justify-center">
            <img src={printIcon} className="size-[32px]"/>
        </button>
      </div>
      <div ref={printRef} className="flex gap-[16px] mt-[16px] bg-[#F6E9DE]">
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
              <div className={`w-[296px] ${hasChildTable ? "h-[124px]" : "h-[136px]"} bg-white rounded-[24px] p-[16px]`}>
                <div className="text-center mx-auto text-accent text-[32px] font-bold">
                  Таблица
                </div>
                <div 
                  hidden={!hasChildTable}
                  className="w-[264px] h-[44px] mt-[16px] gap-[8px] flex justify-center items-center">
                  <button 
                    onClick={deleteTable}
                    className="w-[128px] h-[44px] border-[2px] border-[#FF9797] rounded-[12px] text-[#FF9797] text-[20px] font-semibold flex justify-center items-center text-center">
                    Удалить
                  </button>
                  <button 
                    onClick={toTable}
                    className="w-[128px] h-[44px] bg-accent rounded-[12px] text-white text-[20px] font-semibold flex justify-center items-center text-center">
                    Перейти
                  </button>
                </div>
                <button
                  onClick={createTable}
                  hidden={hasChildTable}
                  className="disabled:opacity-[20%] mt-[16px] mx-auto w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center"
                >
                      <img src={addIcon} alt="add" className="size-[32px]" />
                      Добавить
                </button>
                <div>

                </div>
              </div>
              <CellEditDocuments cell={data} height={`${!hasChildTable ? "h-[740px]" : `${titleValue!=="" ? "h-[776px]" : "h-[740px]"}`}`}/>
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
