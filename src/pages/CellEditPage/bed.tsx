// import {
//   use,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   type ChangeEvent,
// } from "react";
// import exitIcon from "../../assets/icons/exitIcon.svg";
// import ExitModal from "../../comps/modals/ExitModal";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import arrIcon from "../../assets/icons/arrSimple.svg";
// import ChooseTemplate from "../../comps/AdminTable/ChooseTemplate/ChooseTemplate";
// import { CellEditDocuments } from "./CellEditDocuments/CellEditDocuments";
// import addIcon from "../../assets/icons/addIcon.svg";
// import type { Cell } from "../../types";
// import { CellEditMedia } from "./CellEditMedia/CellEditMedia";
// import { CellEditTable } from "./CellEditTable/CellEditTable";
// import CellEditConfirmModal from "./CellEditConfirmModal/CellEditConfirmModal";
// import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
// import { observer } from "mobx-react-lite";
// import printIcon from "../../assets/icons/printIcon.svg";
// //import { useGetCurrentCell } from "./hooks/useGetCurrentCell";
// //import { tableStore } from "../AdminPage/SpreadsheetStore";
// //import { toJS } from "mobx";
// import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
// import { useReactToPrint } from "react-to-print";
// import axios from "axios";
// import listSvg from "../../assets/icons/Link.svg";
// import { linkStore } from "../../store/LinkHref";

// type Props = { data: SpreadsheetCellEntity };

// const CellEditPage = ({ data }: Props) => {
//   // const [textLinkArea, setTextLinkArea] = useState("");
//   const [isSelected, setIsSelected] = useState(false);
//   const location = useLocation();
//   const linkBack = location.pathname.slice(1) + location.search;

//   const [timelineValue, setTimelineValue] = useState("");
//   const handleTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setTimelineValue(event.target.value);
//   };
//   // console.log(data);
//   const [titleValue, setTitleValue] = useState(data?.title || "");
//   const [textBlockValue, setTextBlockValue] = useState(data?.description || "");
//   //@ts-ignore
//   const apiUrl = window.__API_CONFIG__.apiUrl;
//   // keep a ref to the timeout
//   //@ts-ignore
//   const debounceRef = useRef<NodeJS.Timeout | null>(null);

//   const debouncedOnBlur = useCallback(() => {
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     debounceRef.current = setTimeout(() => {
//       data.updateCellTextContentHandler({
//         title: titleValue,
//         description: textBlockValue,
//       });
//     }, 300); // debounce delay in ms
//   }, [titleValue, textBlockValue]);

//   const handleTextBlocklineChange = (
//     event: ChangeEvent<HTMLTextAreaElement>,
//   ) => {
//     setTextBlockValue(event.target.value);
//   };
//   const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setTitleValue(event.target.value);
//   };

//   const [isExitModalOpen, setExitModalOpen] = useState(false);
//   //const [isTableCellExist] = useState(false);

//   //const [isKeyboardOpen, setKeyboardOpen] = useState(false);

//   const navigate = useNavigate();
//   //const params = useParams();
//   const handleBack = () => {
//     navigate(-1);
//   };
//   // const [data.type, setSelectedTemplate] = useState<Cell["type"] | null>(
//   //   data?.type || null,
//   // ); //text, images, text-media, table
//   const [isTimeline] = useState();

//   const [currentCellVariantModal, setCurrentCellVariantModal] = useState<
//     Cell["type"] | null
//   >(null);

//   const onSelectTemplate = (type: Cell["type"]) =>
//     setCurrentCellVariantModal(type);

//   const onCellVariantModalCancel = () => setCurrentCellVariantModal(null);
//   const onCellVariantModalConfirm = async (variant: Cell["type"]) => {
//     setCurrentCellVariantModal(null);
//     await data.updateType(variant);
//   };
//   const printRef = useRef(null);
//   const onPrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Редактирование ячейки",
//     //onAfterPrint: handleAfterPrint,
//     //onBeforePrint: handleBeforePrint,
//     pageStyle: "{ size: 0 }",
//   });
//   const childTable = useRef(data.children?.id);
//   const Modals = (
//     <>
//       <CellEditConfirmModal
//         cellVariant="media"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="table"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="text"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="text-media"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//     </>
//   );

//   const toTable = () => {
//     console.log(childTable.current);

//     if (!!childTable.current) navigate(`/admin/table?id=${childTable.current}`);
//     else console.log("error");
//   };
//   const deleteTable = () => {
//     console.log("cant delete");
//   };
//   const createTable = () => {
//     //setHasChildTable(true);
//     console.log(data.id);
//     axios
//       .post(`${apiUrl}api/spreadsheets?cell=${data.id}`)
//       .then((response) => {
//         childTable.current = response.data.id;
//         setHasChildTable(true);
//       })
//       .catch((error) => {
//         console.error("Ошибка:", error);
//       });
//   };
//   const [hasChildTable, setHasChildTable] = useState(!!childTable.current);
//   // console.log(data);

//   // const handleMouseUp = () => {
//   //   const selection = window.getSelection();
//   //   const text = selection ? selection.toString() : "";
//   //   console.log(selection?.S);

//   //   linkStore.setIndex([1, 3])
//   //   setTextLinkArea(text)
//   //   if (text) {
//   //     console.log("Выделено:", text);
//   //   }
//   // };

//   // const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
//   //   const target = e.target as HTMLTextAreaElement;
//   //   const start = target.selectionStart;
//   //   const end = target.selectionEnd;
//   //   const text = target.value.slice(start, end);

//   //   console.log("Выделено:", text);
//   //   console.log("Позиции:", start, end);

//   //   linkStore.setIndex([start, end]);
//   // };

//   // const handleMouseUp = () => {
//   //   const selection = window.getSelection()?.toString() ?? "";

//   //   if (selection.trim().length === 0) {
//   //     setIsSelected(false);
//   //   } else {
//   //     setIsSelected(true);
//   //   }
//   // };

//   const handleMouseUp = (event: React.MouseEvent<HTMLTextAreaElement>) => {
//   const textarea = event.target as HTMLTextAreaElement;

//   const start = textarea.selectionStart;
//   const end = textarea.selectionEnd;

//   // выделенный текст
//   const selectedText = textarea.value.substring(start, end);

//   if (selectedText.trim().length === 0) {
//     setIsSelected(false);
//   } else {
//     setIsSelected(true);
//   }

//   // сохраняем индексы (например, в MobX store)
//   linkStore.setIndex([start, end]);

//   console.log("start:", start, "end:", end, "text:", selectedText);
// };

//   console.log(linkStore.link.href, linkStore.link.index);

//   const CreateLink = () => {
//     linkStore.link.href = linkBack;
//     // console.log(linkStore.link.index);
    
//     navigate("/");
//     linkStore.setShowHeader(true);
//   };

//   return (
//     <div className="animate-appear w-full h-full p-[32px]">
//       {Modals}
//       <OverlayLoader isLoading={data.isLoading} />
//       <div className="flex items-center gap-[16px] relative">
//         <button
//           onClick={() => setExitModalOpen(true)}
//           className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
//         >
//           <img src={exitIcon} alt="exit" className="size-[32px]" />
//         </button>
//         <button
//           onClick={handleBack}
//           className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
//         >
//           <img src={arrIcon} alt="back" className="size-[32px]" />
//         </button>
//         <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
//           Редактирование ячейки
//         </div>
//         <button
//           onClick={onPrint}
//           className="size-[72px] rounded-[24px] bg-white absolute right-0 flex items-center justify-center"
//         >
//           <img src={printIcon} className="size-[32px]" />
//         </button>
//       </div>
//       <div ref={printRef} className="flex gap-[16px] mt-[16px] bg-[#F6E9DE]">
//         <ChooseTemplate
//           selectedTemplate={data.type}
//           setSelectedTemplate={onSelectTemplate}
//         />

//         {data.type && (
//           <>
//             <div
//               style={{
//                 width: `${data.type == "table" ? 1544 : 1232}px`,
//               }}
//               className={`h-[928px] flex flex-col gap-[16px]`}
//             >
//               <div className="w-[1232px] h-[92px] flex gap-[16px]">
//                 <div className="w-full h-full rounded-[24px] bg-white p-[24px] text-left">
//                   <span className="text-[16px] text-accent font-bold">
//                     Название{!isTimeline && "*"}
//                   </span>
//                   <input
//                     onChange={handleTitleChange}
//                     onBlur={debouncedOnBlur}
//                     value={titleValue}
//                     placeholder="Укажите название"
//                     className="w-full h-[20px] mt-[8px] text-text"
//                   />
//                 </div>
//                 <div
//                   hidden={!isTimeline}
//                   className="w-full h-full rounded-[24px] bg-white p-[24px] text-left"
//                 >
//                   <span className="text-[16px] text-accent font-bold">
//                     Значение*
//                   </span>
//                   <input
//                     onChange={handleTimelineChange}
//                     value={timelineValue}
//                     placeholder="Укажите временной период"
//                     className="w-full h-[20px] mt-[8px] text-text"
//                   />
//                 </div>
//               </div>
//               <div
//                 hidden={data.type !== "text-media" && data.type !== "media"}
//                 className="w-[1232px] min-h-[160px] max-h-[600px] rounded-[24px] bg-white p-[24px]"
//               >
//                 {data && <CellEditMedia cell={data} />}
//               </div>
//               <div
//                 hidden={data.type !== "text" && data.type !== "text-media"}
//                 className={`w-[1232px] flex-1
//                   // ${data.type === "text" ? "h-[820px]" : "h-[644px]"}
//                    rounded-[24px] bg-white p-[24px]`}
//               >
//                 <span className="text-[16px] text-accent font-bold w-[1184px] h-[16px] flex mb-[8px] justify-between items-center">
//                   <p>Текст</p>
//                   <button
//                     onClick={CreateLink}
//                     className={`w-[183px] h-[24px] rounded-[12px] bg-[#004662] text-[#FFFFFF] flex items-center justify-center gap-[8px] cursor-pointer ${!isSelected && "opacity-30"}`}
//                   >
//                     <img src={listSvg} alt="" />
//                     Создать ссылку
//                   </button>
//                 </span>
//                 {/* <button onClick={handleMakeLink}>🔗 Сделать ссылкой</button> */}
//                 <textarea
//                   onMouseUp={handleMouseUp}
//                   onSelect={handleMouseUp}
//                   wrap="soft"
//                   onBlur={debouncedOnBlur}
//                   onChange={handleTextBlocklineChange}
//                   value={textBlockValue}
//                   className="w-full h-full text-text outline-none text-wrap resize-none"
//                 />
//               </div>

//               {data.type === "table" && <CellEditTable data={data} />}
//             </div>

//             <div
//               className="w-[296px] h-[928px] flex flex-col gap-[16px]"
//               hidden={data.type === "table"}
//             >
//               <div
//                 className={`w-[296px] ${hasChildTable ? "h-[124px]" : "h-[136px]"} bg-white rounded-[24px] p-[16px]`}
//               >
//                 <div className="text-center mx-auto text-accent text-[32px] font-bold">
//                   Таблица
//                 </div>
//                 <div
//                   hidden={!hasChildTable}
//                   className="w-[264px] h-[44px] mt-[16px] gap-[8px] flex justify-center items-center"
//                 >
//                   <button
//                     onClick={deleteTable}
//                     className="w-[128px] h-[44px] border-[2px] border-[#FF9797] rounded-[12px] text-[#FF9797] text-[20px] font-semibold flex justify-center items-center text-center"
//                   >
//                     Удалить
//                   </button>
//                   <button
//                     onClick={toTable}
//                     className="w-[128px] h-[44px] bg-accent rounded-[12px] text-white text-[20px] font-semibold flex justify-center items-center text-center"
//                   >
//                     Перейти
//                   </button>
//                 </div>
//                 <button
//                   onClick={createTable}
//                   hidden={hasChildTable}
//                   className="disabled:opacity-[20%] mt-[16px] mx-auto w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center"
//                 >
//                   <img src={addIcon} alt="add" className="size-[32px]" />
//                   Добавить
//                 </button>
//                 <div></div>
//               </div>
//               <CellEditDocuments
//                 cell={data}
//                 height={`${!hasChildTable ? "h-[740px]" : `${titleValue !== "" ? "h-[776px]" : "h-[740px]"}`}`}
//               />
//             </div>
//           </>
//         )}
//       </div>
//       {isExitModalOpen && (
//         <ExitModal
//           onNo={() => setExitModalOpen(false)}
//           onYes={() => {
//             setExitModalOpen(false);
//             navigate("/");
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default observer(CellEditPage);








































// import {
//   use,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   type ChangeEvent,
// } from "react";
// import exitIcon from "../../assets/icons/exitIcon.svg";
// import ExitModal from "../../comps/modals/ExitModal";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import arrIcon from "../../assets/icons/arrSimple.svg";
// import ChooseTemplate from "../../comps/AdminTable/ChooseTemplate/ChooseTemplate";
// import { CellEditDocuments } from "./CellEditDocuments/CellEditDocuments";
// import addIcon from "../../assets/icons/addIcon.svg";
// import type { Cell } from "../../types";
// import { CellEditMedia } from "./CellEditMedia/CellEditMedia";
// import { CellEditTable } from "./CellEditTable/CellEditTable";
// import CellEditConfirmModal from "./CellEditConfirmModal/CellEditConfirmModal";
// import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
// import { observer } from "mobx-react-lite";
// import printIcon from "../../assets/icons/printIcon.svg";
// //import { useGetCurrentCell } from "./hooks/useGetCurrentCell";
// //import { tableStore } from "../AdminPage/SpreadsheetStore";
// //import { toJS } from "mobx";
// import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
// import { useReactToPrint } from "react-to-print";
// import axios from "axios";
// import listSvg from "../../assets/icons/Link.svg";
// import { linkStore } from "../../store/LinkHref";

// type Props = { data: SpreadsheetCellEntity };

// const CellEditPage = ({ data }: Props) => {
//   // const [textLinkArea, setTextLinkArea] = useState("");
//   const [isSelected, setIsSelected] = useState(false);
//   const location = useLocation();
//   const linkBack = location.pathname.slice(1) + location.search;

//   const [timelineValue, setTimelineValue] = useState("");
//   const handleTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setTimelineValue(event.target.value);
//   };
//   // console.log(data);
//   const [titleValue, setTitleValue] = useState(data?.title || "");
//   const [textBlockValue, setTextBlockValue] = useState(data?.description || "");
//   //@ts-ignore
//   const apiUrl = window.__API_CONFIG__.apiUrl;
//   // keep a ref to the timeout
//   //@ts-ignore
//   const debounceRef = useRef<NodeJS.Timeout | null>(null);

//   const debouncedOnBlur = useCallback(() => {
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     debounceRef.current = setTimeout(() => {
//       data.updateCellTextContentHandler({
//         title: titleValue,
//         description: textBlockValue,
//       });
//     }, 300); // debounce delay in ms
//   }, [titleValue, textBlockValue]);

//   const highlightText = (text) => {
//     let escaped = text
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/\n/g, "<br>");

//     // Добавляем подсветку слов
//     escaped = escaped.replace(
//       /\b(ошибка)\b/gi,
//       `<span style="color: red; font-weight: bold;">$1</span>`,
//     );
//     escaped = escaped.replace(
//       /\b(внимание)\b/gi,
//       `<span style="color: orange; font-weight: bold;">$1</span>`,
//     );

//     return escaped;
//   };

//     const taRef = useRef(null);
//   const overlayRef = useRef(null);

//   //   const highlightedHTML = useMemo(() => {
//   //   const esc = (s) =>
//   //     s
//   //       .replace(/&/g, "&amp;")
//   //       .replace(/</g, "&lt;")
//   //       .replace(/>/g, "&gt;");
//   //   // сохраняем последовательности пробелов
//   //   const withSpaces = esc(textBlockValue).replace(/ {2,}/g, (m) => "&nbsp;".repeat(m.length));
//   //   // заменяем одиночные пробелы возле края строк (конечные) на nbsp
//   //   const preserveTrailing = withSpaces.replace(/(\s)$/gm, "&nbsp;");
//   //   // переносы
//   //   const withBreaks = preserveTrailing.replace(/\n/g, "<br>");
//   //   // пример подсветки (можно убрать)
//   //   return withBreaks.replace(/\b(ya)\b/g, `<span style="color:#2563eb;font-weight:600;">$1</span>`);
//   // }, [textBlockValue]);

//   const highlightedHTML = useMemo(() => {
//     return textBlockValue.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, (match, url, text) => {
//       // Оставляем только текст ссылки, скрываем URL
//       return `<a href="${url}" target="_blank" style="color: #1D72B8; text-decoration: underline;">${text}</a>`;
//     });
//   }, [textBlockValue]);

//   // const syncScroll = (e) => {
//   //   if (!overlayRef.current) return;
//   //   overlayRef.current.scrollTop = e.currentTarget.scrollTop;
//   //   overlayRef.current.scrollLeft = e.currentTarget.scrollLeft;
//   // };

//   const handleTextBlocklineChange = (
//     event: ChangeEvent<HTMLTextAreaElement>,
//   ) => {
//     setTextBlockValue(event.target.value);
//   };
//   const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setTitleValue(event.target.value);
//   };

//   const [isExitModalOpen, setExitModalOpen] = useState(false);
//   //const [isTableCellExist] = useState(false);

//   //const [isKeyboardOpen, setKeyboardOpen] = useState(false);

//   const navigate = useNavigate();
//   //const params = useParams();
//   const handleBack = () => {
//     navigate(-1);
//   };
//   // const [data.type, setSelectedTemplate] = useState<Cell["type"] | null>(
//   //   data?.type || null,
//   // ); //text, images, text-media, table
//   const [isTimeline] = useState();

//   const [currentCellVariantModal, setCurrentCellVariantModal] = useState<
//     Cell["type"] | null
//   >(null);

//   const onSelectTemplate = (type: Cell["type"]) =>
//     setCurrentCellVariantModal(type);

//   const onCellVariantModalCancel = () => setCurrentCellVariantModal(null);
//   const onCellVariantModalConfirm = async (variant: Cell["type"]) => {
//     setCurrentCellVariantModal(null);
//     await data.updateType(variant);
//   };
//   const printRef = useRef(null);
//   const onPrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Редактирование ячейки",
//     //onAfterPrint: handleAfterPrint,
//     //onBeforePrint: handleBeforePrint,
//     pageStyle: "{ size: 0 }",
//   });
//   const childTable = useRef(data.children?.id);
//   const Modals = (
//     <>
//       <CellEditConfirmModal
//         cellVariant="media"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="table"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="text"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="text-media"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//     </>
//   );

//   const toTable = () => {
//     console.log(childTable.current);

//     if (!!childTable.current) navigate(`/admin/table?id=${childTable.current}`);
//     else console.log("error");
//   };
//   const deleteTable = () => {
//     console.log("cant delete");
//   };
//   const createTable = () => {
//     //setHasChildTable(true);
//     console.log(data.id);
//     axios
//       .post(`${apiUrl}api/spreadsheets?cell=${data.id}`)
//       .then((response) => {
//         childTable.current = response.data.id;
//         setHasChildTable(true);
//       })
//       .catch((error) => {
//         console.error("Ошибка:", error);
//       });
//   };
//   const [hasChildTable, setHasChildTable] = useState(!!childTable.current);
//   // console.log(data);



//   const handleMouseUp = (event: React.MouseEvent<HTMLTextAreaElement>) => {
//     const textarea = event.target as HTMLTextAreaElement;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;

//     // выделенный текст
//     const selectedText = textarea.value.substring(start, end);

//     if (selectedText.trim().length === 0) {
//       setIsSelected(false);
//     } else {
//       setIsSelected(true);
//     }

//     // сохраняем индексы (например, в MobX store)
//     linkStore.setIndex([start, end]);

//     console.log("start:", start, "end:", end, "text:", selectedText);
//   };

//   console.log(linkStore.link.href, linkStore.link.index);

//   const CreateLink = () => {
//     linkStore.link.href = linkBack;
//     // console.log(linkStore.link.index);

//     navigate("/");
//     linkStore.setShowHeader(true);
//   };

//   return (
//     <div className="animate-appear w-full h-full p-[32px]">
//       {Modals}
//       <OverlayLoader isLoading={data.isLoading} />
//       <div className="flex items-center gap-[16px] relative">
//         <button
//           onClick={() => setExitModalOpen(true)}
//           className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
//         >
//           <img src={exitIcon} alt="exit" className="size-[32px]" />
//         </button>
//         <button
//           onClick={handleBack}
//           className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
//         >
//           <img src={arrIcon} alt="back" className="size-[32px]" />
//         </button>
//         <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
//           Редактирование ячейки
//         </div>
//         <button
//           onClick={onPrint}
//           className="size-[72px] rounded-[24px] bg-white absolute right-0 flex items-center justify-center"
//         >
//           <img src={printIcon} className="size-[32px]" />
//         </button>
//       </div>
//       <div ref={printRef} className="flex gap-[16px] mt-[16px] bg-[#F6E9DE]">
//         <ChooseTemplate
//           selectedTemplate={data.type}
//           setSelectedTemplate={onSelectTemplate}
//         />

//         {data.type && (
//           <>
//             <div
//               style={{
//                 width: `${data.type == "table" ? 1544 : 1232}px`,
//               }}
//               className={`h-[928px] flex flex-col gap-[16px]`}
//             >
//               <div className="w-[1232px] h-[92px] flex gap-[16px]">
//                 <div className="w-full h-full rounded-[24px] bg-white p-[24px] text-left">
//                   <span className="text-[16px] text-accent font-bold">
//                     Название{!isTimeline && "*"}
//                   </span>
//                   <input
//                     onChange={handleTitleChange}
//                     onBlur={debouncedOnBlur}
//                     value={titleValue}
//                     placeholder="Укажите название"
//                     className="w-full h-[20px] mt-[8px] text-text"
//                   />
//                 </div>
//                 <div
//                   hidden={!isTimeline}
//                   className="w-full h-full rounded-[24px] bg-white p-[24px] text-left"
//                 >
//                   <span className="text-[16px] text-accent font-bold">
//                     Значение*
//                   </span>
//                   <input
//                     onChange={handleTimelineChange}
//                     value={timelineValue}
//                     placeholder="Укажите временной период"
//                     className="w-full h-[20px] mt-[8px] text-text"
//                   />
//                 </div>
//               </div>
//               <div
//                 hidden={data.type !== "text-media" && data.type !== "media"}
//                 className="w-[1232px] min-h-[160px] max-h-[600px] rounded-[24px] bg-white p-[24px]"
//               >
//                 {data && <CellEditMedia cell={data} />}
//               </div>
//               <div
//                 hidden={data.type !== "text" && data.type !== "text-media"}
//                 className={`w-[1232px] flex-1
//                   // ${data.type === "text" ? "h-[820px]" : "h-[644px]"}
//                    rounded-[24px] bg-white p-[24px]`}
//               >
//                 <span className="text-[16px] text-accent font-bold w-[1184px] h-[16px] flex mb-[8px] justify-between items-center">
//                   <p>Текст</p>
//                   <button
//                     onClick={CreateLink}
//                     className={`w-[183px] h-[24px] rounded-[12px] bg-[#004662] text-[#FFFFFF] flex items-center justify-center gap-[8px] cursor-pointer ${!isSelected && "opacity-30"}`}
//                   >
//                     <img src={listSvg} alt="" />
//                     Создать ссылку
//                   </button>
//                 </span>
//                 {/* <button onClick={handleMakeLink}>🔗 Сделать ссылкой</button> */}
//                 {/* <textarea
//                   onMouseUp={handleMouseUp}
//                   onSelect={handleMouseUp}
//                   wrap="soft"
//                   onBlur={debouncedOnBlur}
//                   onChange={handleTextBlocklineChange}
//                   value={textBlockValue}
//                   className="w-full h-full text-text outline-none text-wrap resize-none"
//                 /> */}
//                 <div className="relative w-full h-32">
//       {/* Слой с подсветкой ссылок */}
//       <div
//         className="absolute inset-0 pointer-events-none w-full h-full overflow-auto p-2 text-text"
//         style={{
//           whiteSpace: "pre-wrap", // Сохранение переносов
//           wordBreak: "break-word",
//           overflowWrap: "break-word",
//           boxSizing: "border-box",
//         }}
//         dangerouslySetInnerHTML={{ __html: highlightedHTML }}
//       />

//       {/* Тот же текст в textarea (без тегов) */}
//       <textarea
//         spellCheck={false}
//         onMouseUp={handleMouseUp}
//         onSelect={handleMouseUp}
//         wrap="soft"
//         onBlur={debouncedOnBlur}
//         onChange={handleTextBlocklineChange}
//         value={textBlockValue}
//         className="w-full h-full resize-none outline-none bg-transparent relative z-10 p-2"
//         style={{
//           color: "transparent", // Текст не виден
//           caretColor: "#000",   // Цвет курсора
//           whiteSpace: "pre-wrap",
//           wordBreak: "break-word",
//           overflowWrap: "break-word",
//           boxSizing: "border-box",
//         }}
//       />
//     </div>

//               </div>

//               {data.type === "table" && <CellEditTable data={data} />}
//             </div>

//             <div
//               className="w-[296px] h-[928px] flex flex-col gap-[16px]"
//               hidden={data.type === "table"}
//             >
//               <div
//                 className={`w-[296px] ${hasChildTable ? "h-[124px]" : "h-[136px]"} bg-white rounded-[24px] p-[16px]`}
//               >
//                 <div className="text-center mx-auto text-accent text-[32px] font-bold">
//                   Таблица
//                 </div>
//                 <div
//                   hidden={!hasChildTable}
//                   className="w-[264px] h-[44px] mt-[16px] gap-[8px] flex justify-center items-center"
//                 >
//                   <button
//                     onClick={deleteTable}
//                     className="w-[128px] h-[44px] border-[2px] border-[#FF9797] rounded-[12px] text-[#FF9797] text-[20px] font-semibold flex justify-center items-center text-center"
//                   >
//                     Удалить
//                   </button>
//                   <button
//                     onClick={toTable}
//                     className="w-[128px] h-[44px] bg-accent rounded-[12px] text-white text-[20px] font-semibold flex justify-center items-center text-center"
//                   >
//                     Перейти
//                   </button>
//                 </div>
//                 <button
//                   onClick={createTable}
//                   hidden={hasChildTable}
//                   className="disabled:opacity-[20%] mt-[16px] mx-auto w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center"
//                 >
//                   <img src={addIcon} alt="add" className="size-[32px]" />
//                   Добавить
//                 </button>
//                 <div></div>
//               </div>
//               <CellEditDocuments
//                 cell={data}
//                 height={`${!hasChildTable ? "h-[740px]" : `${titleValue !== "" ? "h-[776px]" : "h-[740px]"}`}`}
//               />
//             </div>
//           </>
//         )}
//       </div>
//       {isExitModalOpen && (
//         <ExitModal
//           onNo={() => setExitModalOpen(false)}
//           onYes={() => {
//             setExitModalOpen(false);
//             navigate("/");
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default observer(CellEditPage);














































// import {
//   use,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   type ChangeEvent,
// } from "react";
// import exitIcon from "../../assets/icons/exitIcon.svg";
// import ExitModal from "../../comps/modals/ExitModal";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import arrIcon from "../../assets/icons/arrSimple.svg";
// import ChooseTemplate from "../../comps/AdminTable/ChooseTemplate/ChooseTemplate";
// import { CellEditDocuments } from "./CellEditDocuments/CellEditDocuments";
// import addIcon from "../../assets/icons/addIcon.svg";
// import type { Cell } from "../../types";
// import { CellEditMedia } from "./CellEditMedia/CellEditMedia";
// import { CellEditTable } from "./CellEditTable/CellEditTable";
// import CellEditConfirmModal from "./CellEditConfirmModal/CellEditConfirmModal";
// import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";
// import { observer } from "mobx-react-lite";
// import printIcon from "../../assets/icons/printIcon.svg";
// //import { useGetCurrentCell } from "./hooks/useGetCurrentCell";
// //import { tableStore } from "../AdminPage/SpreadsheetStore";
// //import { toJS } from "mobx";
// import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
// import { useReactToPrint } from "react-to-print";
// import axios from "axios";
// import listSvg from "../../assets/icons/Link.svg";
// import { linkStore } from "../../store/LinkHref";

// type Props = { data: SpreadsheetCellEntity };

// const CellEditPage = ({ data }: Props) => {
//   // const [textLinkArea, setTextLinkArea] = useState("");
//   const [isSelected, setIsSelected] = useState(false);
//   const location = useLocation();
//   const linkBack = location.pathname.slice(1) + location.search;

//   const [timelineValue, setTimelineValue] = useState("");
//   const handleTimelineChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setTimelineValue(event.target.value);
//   };
//   // console.log(data);
//   const [titleValue, setTitleValue] = useState(data?.title || "");
//   const [textBlockValue, setTextBlockValue] = useState(data?.description || "");
//   //@ts-ignore
//   const apiUrl = window.__API_CONFIG__.apiUrl;
//   // keep a ref to the timeout
//   //@ts-ignore
//   const debounceRef = useRef<NodeJS.Timeout | null>(null);

//   const debouncedOnBlur = useCallback(() => {
//     if (debounceRef.current) {
//       clearTimeout(debounceRef.current);
//     }

//     debounceRef.current = setTimeout(() => {
//       data.updateCellTextContentHandler({
//         title: titleValue,
//         description: textBlockValue,
//       });
//     }, 300); // debounce delay in ms
//   }, [titleValue, textBlockValue]);

//   const highlightText = (text) => {
//     let escaped = text
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/\n/g, "<br>");

//     // Добавляем подсветку слов
//     escaped = escaped.replace(
//       /\b(ошибка)\b/gi,
//       `<span style="color: red; font-weight: bold;">$1</span>`,
//     );
//     escaped = escaped.replace(
//       /\b(внимание)\b/gi,
//       `<span style="color: orange; font-weight: bold;">$1</span>`,
//     );

//     return escaped;
//   };

//     const taRef = useRef(null);
//   const overlayRef = useRef(null);

//   //   const highlightedHTML = useMemo(() => {
//   //   const esc = (s) =>
//   //     s
//   //       .replace(/&/g, "&amp;")
//   //       .replace(/</g, "&lt;")
//   //       .replace(/>/g, "&gt;");
//   //   // сохраняем последовательности пробелов
//   //   const withSpaces = esc(textBlockValue).replace(/ {2,}/g, (m) => "&nbsp;".repeat(m.length));
//   //   // заменяем одиночные пробелы возле края строк (конечные) на nbsp
//   //   const preserveTrailing = withSpaces.replace(/(\s)$/gm, "&nbsp;");
//   //   // переносы
//   //   const withBreaks = preserveTrailing.replace(/\n/g, "<br>");
//   //   // пример подсветки (можно убрать)
//   //   return withBreaks.replace(/\b(ya)\b/g, `<span style="color:#2563eb;font-weight:600;">$1</span>`);
//   // }, [textBlockValue]);

//   const cleanTextForTextarea = (text) => {
//     // Очищаем текст от тегов для отображения в textarea
//     return text.replace(/<a[^>]*>([^<]+)<\/a>/g, "$1");
//   };

//   const highlightedHTML = useMemo(() => {
//     // Рендерим ссылку корректно в HTML для отображения в div
//     return textBlockValue.replace(/<a href="([^"]+)">([^<]+)<\/a>/g, (match, url, text) => {
//       return `<a href="${url}" target="_blank" style="color: #1D72B8; text-decoration: underline;">${text}</a>`;
//     });
//   }, [textBlockValue]);
  

//   //  const overlayRef = useRef(null);
//   const textareaRef = useRef(null);

//   // Синхронизируем скролл двух элементов
//   const syncScroll = (e) => {
//     if (overlayRef.current && textareaRef.current) {
//       // Синхронизируем scrollTop и scrollLeft
//       const { scrollTop, scrollLeft } = e.target;
//       if (e.target === overlayRef.current) {
//         textareaRef.current.scrollTop = scrollTop;
//         textareaRef.current.scrollLeft = scrollLeft;
//       } else if (e.target === textareaRef.current) {
//         overlayRef.current.scrollTop = scrollTop;
//         overlayRef.current.scrollLeft = scrollLeft;
//       }
//     }
//   };

//   // const syncScroll = (e) => {
//   //   if (!overlayRef.current) return;
//   //   overlayRef.current.scrollTop = e.currentTarget.scrollTop;
//   //   overlayRef.current.scrollLeft = e.currentTarget.scrollLeft;
//   // };

//   const handleTextBlocklineChange = (
//     event: ChangeEvent<HTMLTextAreaElement>,
//   ) => {
//     setTextBlockValue(event.target.value);
//   };
//   const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setTitleValue(event.target.value);
//   };

//   const [isExitModalOpen, setExitModalOpen] = useState(false);
//   //const [isTableCellExist] = useState(false);

//   //const [isKeyboardOpen, setKeyboardOpen] = useState(false);

//   const navigate = useNavigate();
//   //const params = useParams();
//   const handleBack = () => {
//     navigate(-1);
//   };
//   // const [data.type, setSelectedTemplate] = useState<Cell["type"] | null>(
//   //   data?.type || null,
//   // ); //text, images, text-media, table
//   const [isTimeline] = useState();

//   const [currentCellVariantModal, setCurrentCellVariantModal] = useState<
//     Cell["type"] | null
//   >(null);

//   const onSelectTemplate = (type: Cell["type"]) =>
//     setCurrentCellVariantModal(type);

//   const onCellVariantModalCancel = () => setCurrentCellVariantModal(null);
//   const onCellVariantModalConfirm = async (variant: Cell["type"]) => {
//     setCurrentCellVariantModal(null);
//     await data.updateType(variant);
//   };
//   const printRef = useRef(null);
//   const onPrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Редактирование ячейки",
//     //onAfterPrint: handleAfterPrint,
//     //onBeforePrint: handleBeforePrint,
//     pageStyle: "{ size: 0 }",
//   });
//   const childTable = useRef(data.children?.id);
//   const Modals = (
//     <>
//       <CellEditConfirmModal
//         cellVariant="media"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="table"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="text"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//       <CellEditConfirmModal
//         cellVariant="text-media"
//         currentCellVariant={currentCellVariantModal}
//         onNo={onCellVariantModalCancel}
//         onYes={onCellVariantModalConfirm}
//       />
//     </>
//   );

//   const toTable = () => {
//     console.log(childTable.current);

//     if (!!childTable.current) navigate(`/admin/table?id=${childTable.current}`);
//     else console.log("error");
//   };
//   const deleteTable = () => {
//     console.log("cant delete");
//   };
//   const createTable = () => {
//     //setHasChildTable(true);
//     console.log(data.id);
//     axios
//       .post(`${apiUrl}api/spreadsheets?cell=${data.id}`)
//       .then((response) => {
//         childTable.current = response.data.id;
//         setHasChildTable(true);
//       })
//       .catch((error) => {
//         console.error("Ошибка:", error);
//       });
//   };
//   const [hasChildTable, setHasChildTable] = useState(!!childTable.current);
//   // console.log(data);



//   const handleMouseUp = (event: React.MouseEvent<HTMLTextAreaElement>) => {
//     const textarea = event.target as HTMLTextAreaElement;

//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;

//     // выделенный текст
//     const selectedText = textarea.value.substring(start, end);

//     if (selectedText.trim().length === 0) {
//       setIsSelected(false);
//     } else {
//       setIsSelected(true);
//     }

//     // сохраняем индексы (например, в MobX store)
//     linkStore.setIndex([start, end]);

//     console.log("start:", start, "end:", end, "text:", selectedText);
//   };

//   console.log(linkStore.link.href, linkStore.link.index);

//   const CreateLink = () => {
//     linkStore.link.href = linkBack;
//     // console.log(linkStore.link.index);

//     navigate("/");
//     linkStore.setShowHeader(true);
//   };



  

//   return (
//     <div className="animate-appear w-full h-full p-[32px]">
//       {Modals}
//       <OverlayLoader isLoading={data.isLoading} />
//       <div className="flex items-center gap-[16px] relative">
//         <button
//           onClick={() => setExitModalOpen(true)}
//           className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
//         >
//           <img src={exitIcon} alt="exit" className="size-[32px]" />
//         </button>
//         <button
//           onClick={handleBack}
//           className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
//         >
//           <img src={arrIcon} alt="back" className="size-[32px]" />
//         </button>
//         <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
//           Редактирование ячейки
//         </div>
//         <button
//           onClick={onPrint}
//           className="size-[72px] rounded-[24px] bg-white absolute right-0 flex items-center justify-center"
//         >
//           <img src={printIcon} className="size-[32px]" />
//         </button>
//       </div>
//       <div ref={printRef} className="flex gap-[16px] mt-[16px] bg-[#F6E9DE]">
//         <ChooseTemplate
//           selectedTemplate={data.type}
//           setSelectedTemplate={onSelectTemplate}
//         />

//         {data.type && (
//           <>
//             <div
//               style={{
//                 width: `${data.type == "table" ? 1544 : 1232}px`,
//               }}
//               className={`h-[928px] flex flex-col gap-[16px]`}
//             >
//               <div className="w-[1232px] h-[92px] flex gap-[16px]">
//                 <div className="w-full h-full rounded-[24px] bg-white p-[24px] text-left">
//                   <span className="text-[16px] text-accent font-bold">
//                     Название{!isTimeline && "*"}
//                   </span>
//                   <input
//                     onChange={handleTitleChange}
//                     onBlur={debouncedOnBlur}
//                     value={titleValue}
//                     placeholder="Укажите название"
//                     className="w-full h-[20px] mt-[8px] text-text"
//                   />
//                 </div>
//                 <div
//                   hidden={!isTimeline}
//                   className="w-full h-full rounded-[24px] bg-white p-[24px] text-left"
//                 >
//                   <span className="text-[16px] text-accent font-bold">
//                     Значение*
//                   </span>
//                   <input
//                     onChange={handleTimelineChange}
//                     value={timelineValue}
//                     placeholder="Укажите временной период"
//                     className="w-full h-[20px] mt-[8px] text-text"
//                   />
//                 </div>
//               </div>
//               <div
//                 hidden={data.type !== "text-media" && data.type !== "media"}
//                 className="w-[1232px] min-h-[160px] max-h-[600px] rounded-[24px] bg-white p-[24px]"
//               >
//                 {data && <CellEditMedia cell={data} />}
//               </div>
//               <div
//                 hidden={data.type !== "text" && data.type !== "text-media"}
//                 className={`w-[1232px] flex-1
//                   // ${data.type === "text" ? "h-[820px]" : "h-[644px]"}
//                    rounded-[24px] bg-white p-[24px]`}
//               >
//                 <span className="text-[16px] text-accent font-bold w-[1184px] h-[16px] flex mb-[8px] justify-between items-center">
//                   <p>Текст</p>
//                   <button
//                     onClick={CreateLink}
//                     className={`w-[183px] h-[24px] rounded-[12px] bg-[#004662] text-[#FFFFFF] flex items-center justify-center gap-[8px] cursor-pointer ${!isSelected && "opacity-30"}`}
//                   >
//                     <img src={listSvg} alt="" />
//                     Создать ссылку
//                   </button>
//                 </span>
//                 {/* <button onClick={handleMakeLink}>🔗 Сделать ссылкой</button> */}
//                 {/* <textarea
//                   onMouseUp={handleMouseUp}
//                   onSelect={handleMouseUp}
//                   wrap="soft"
//                   onBlur={debouncedOnBlur}
//                   onChange={handleTextBlocklineChange}
//                   value={textBlockValue}
//                   className="w-full h-full text-text outline-none text-wrap resize-none"
//                 /> */}
//                     <div className="relative w-full h-32">
//       {/* Слой с подсветкой ссылок */}
//       <div
//         className="absolute inset-0 pointer-events-none w-full h-[465px] overflow-auto p-2 text-text"
//         ref={overlayRef}
//         style={{
//           whiteSpace: "pre-wrap", // Сохранение переносов
//           wordBreak: "break-word",
//           overflowWrap: "break-word",
//           boxSizing: "border-box",
//         }}
//         dangerouslySetInnerHTML={{ __html: highlightedHTML }}
//         onScroll={syncScroll}
//       />

//       {/* Тот же текст в textarea (без тегов) */}
//       <textarea
//       ref={textareaRef}
//         spellCheck={false}
//         onChange={handleTextBlocklineChange}
//         value={cleanTextForTextarea(textBlockValue)}
//         className="w-full h-[465px] resize-none outline-none bg-transparent relative z-10 p-2 overflow-auto"
//         style={{
//           color: "transparent", // Текст не виден
//           caretColor: "#000",   // Цвет курсора
//           whiteSpace: "pre-wrap",
//           wordBreak: "break-word",
//           overflowWrap: "break-word",
//           boxSizing: "border-box",
//         }}
//         onScroll={syncScroll}
//       />
//     </div>
//               </div>

//               {data.type === "table" && <CellEditTable data={data} />}
//             </div>

//             <div
//               className="w-[296px] h-[928px] flex flex-col gap-[16px]"
//               hidden={data.type === "table"}
//             >
//               <div
//                 className={`w-[296px] ${hasChildTable ? "h-[124px]" : "h-[136px]"} bg-white rounded-[24px] p-[16px]`}
//               >
//                 <div className="text-center mx-auto text-accent text-[32px] font-bold">
//                   Таблица
//                 </div>
//                 <div
//                   hidden={!hasChildTable}
//                   className="w-[264px] h-[44px] mt-[16px] gap-[8px] flex justify-center items-center"
//                 >
//                   <button
//                     onClick={deleteTable}
//                     className="w-[128px] h-[44px] border-[2px] border-[#FF9797] rounded-[12px] text-[#FF9797] text-[20px] font-semibold flex justify-center items-center text-center"
//                   >
//                     Удалить
//                   </button>
//                   <button
//                     onClick={toTable}
//                     className="w-[128px] h-[44px] bg-accent rounded-[12px] text-white text-[20px] font-semibold flex justify-center items-center text-center"
//                   >
//                     Перейти
//                   </button>
//                 </div>
//                 <button
//                   onClick={createTable}
//                   hidden={hasChildTable}
//                   className="disabled:opacity-[20%] mt-[16px] mx-auto w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center"
//                 >
//                   <img src={addIcon} alt="add" className="size-[32px]" />
//                   Добавить
//                 </button>
//                 <div></div>
//               </div>
//               <CellEditDocuments
//                 cell={data}
//                 height={`${!hasChildTable ? "h-[740px]" : `${titleValue !== "" ? "h-[776px]" : "h-[740px]"}`}`}
//               />
//             </div>
//           </>
//         )}
//       </div>
//       {isExitModalOpen && (
//         <ExitModal
//           onNo={() => setExitModalOpen(false)}
//           onYes={() => {
//             setExitModalOpen(false);
//             navigate("/");
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default observer(CellEditPage);
