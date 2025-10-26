import {
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import exitIcon from "../../assets/icons/exitIcon.svg";
import ExitModal from "../../comps/modals/ExitModal";
import { useLocation, useNavigate } from "react-router-dom";
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
import printIcon from "../../assets/icons/printIcon.svg";
//import { useGetCurrentCell } from "./hooks/useGetCurrentCell";
//import { tableStore } from "../AdminPage/SpreadsheetStore";
//import { toJS } from "mobx";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import listSvg from "../../assets/icons/Link.svg";
import { linkStore } from "../../store/LinkHref";
import { ContentEditable } from "./ContentEditable/ContentEditable";

type Props = { data: SpreadsheetCellEntity };

const CellEditPage = ({ data }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const childTable = useRef(data.children?.id);

//   const [indexText, setIndexText] = useState([0, 0]);
//   const [content, setContent] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [timelineValue, setTimelineValue] = useState("");
  const [titleValue, setTitleValue] = useState(data?.title || "");
  const [textBlockValue] = useState(data?.description || "");
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const [hasChildTable, setHasChildTable] = useState(!!childTable.current);
  const [currentCellVariantModal, setCurrentCellVariantModal] = useState<
    Cell["type"] | null
  >(null);

  const linkBack = location.pathname.slice(1) + location.search;
  //@ts-ignore
  const apiUrl = window.__API_CONFIG__.apiUrl;




  const handleTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTimelineValue(event.target.value);
  };

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

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleBack = () => {
    navigate(-1);
  };

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
    pageStyle: "{ size: 0 }",
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
    if (!!childTable.current) navigate(`/admin/table?id=${childTable.current}`);
    else console.log("error");
  };
    const deleteTable = () => {
        axios.get(`${apiUrl}api/spreadsheets/delete-spreadsheet?spreadsheetId=${childTable.current}`)
        .then(() => {
            setHasChildTable(false);
        })
      console.log("cant delete");
    };
  const createTable = () => {
    //setHasChildTable(true);
    // console.log(data.id);
    axios
      .post(`${apiUrl}api/spreadsheets?cell=${data.id}`)
      .then((response) => {
        childTable.current = response.data.id;
        setHasChildTable(true);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  };

    console.log(linkStore.link.href, linkStore.link.index);

  const CreateLink = () => {
    linkStore.link.href = linkBack;
    navigate("/");
    linkStore.setShowHeader(true);
  };

  return (
    <div className="animate-appear w-full h-full p-[32px]">
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
          className="size-[72px] rounded-[24px] bg-white absolute right-0 flex items-center justify-center"
        >
          <img src={printIcon} className="size-[32px]" />
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
              className={`h-[928px] flex flex-col gap-[16px]`}
            >
              <div className="w-[1232px] h-[92px] flex gap-[16px]">
                <div className="w-full h-full rounded-[24px] bg-white p-[24px] text-left">
                  <span className="text-[16px] text-accent font-bold">
                    Название
                  </span>
                  <input
                    onChange={handleTitleChange}
                    onBlur={debouncedOnBlur}
                    value={titleValue}
                    placeholder="Укажите название"
                    className="w-full h-[20px] mt-[8px] text-text"
                  />
                </div>
                <div className="w-full h-full rounded-[24px] bg-white p-[24px] text-left">
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
                className="w-[1232px] min-h-[160px] max-h-[600px] rounded-[24px] bg-white p-[24px]"
              >
                {data && <CellEditMedia cell={data} />}
              </div>
              <div
                hidden={data.type !== "text" && data.type !== "text-media"}
                className={`w-[1232px] flex-1
                  // ${data.type === "text" ? "h-[820px]" : "h-[644px]"}
                   rounded-[24px] bg-white p-[24px] pb-[0px]`}
              >
                <span className="text-[16px] text-accent font-bold w-[1184px] h-[16px] flex mb-[8px] justify-between items-center">
                  <p>Текст</p>
                  <button
                    onClick={CreateLink}
                    className={`w-[183px] h-[24px] rounded-[12px] bg-[#004662] text-[#FFFFFF] flex items-center justify-center gap-[8px] cursor-pointer ${!isSelected && "opacity-30"}`}
                  >
                    <img src={listSvg} alt="" />
                    Создать ссылку
                  </button>
                </span>

                <ContentEditable
                    data={data}
                  html={data?.description || ""} // важно: эта строка стабильна и не зависит от index
                  onSelect={(info) => {
                    // Обновляем MobX, но сам ContentEditable не наблюдает index — ререндера редактора нет
                    console.log(info.start, info.end);
                    
                    linkStore.setIndex([info.start, info.end]);
                    setIsSelected(info.text.trim().length > 0); // если надо подсветить кнопку
                  }}
                />
              </div>

              {data.type === "table" && <CellEditTable data={data} />}
            </div>

            <div
              className="w-[296px] h-[928px] flex flex-col gap-[16px]"
              hidden={data.type === "table"}
            >
              <div
                className={`w-[296px] ${hasChildTable ? "h-[124px]" : "h-[136px]"} bg-white rounded-[24px] p-[16px]`}
              >
                <div className="text-center mx-auto text-accent text-[32px] font-bold">
                  Таблица
                </div>
                <div
                  hidden={!hasChildTable}
                  className="w-[264px] h-[44px] mt-[16px] gap-[8px] flex justify-center items-center"
                >
                  <button
                    onClick={deleteTable}
                    className="w-[128px] h-[44px] border-[2px] border-[#FF9797] rounded-[12px] text-[#FF9797] text-[20px] font-semibold flex justify-center items-center text-center"
                  >
                    Удалить
                  </button>
                  <button
                    onClick={toTable}
                    className="w-[128px] h-[44px] bg-accent rounded-[12px] text-white text-[20px] font-semibold flex justify-center items-center text-center"
                  >
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
                <div></div>
              </div>
              <CellEditDocuments
                cell={data}
                height={`${!hasChildTable ? "h-[740px]" : `${titleValue !== "" ? "h-[776px]" : "h-[740px]"}`}`}
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
