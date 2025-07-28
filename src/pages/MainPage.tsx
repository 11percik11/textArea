import { useEffect, useState } from "react";
import MenuSwipe from "../comps/MenuSwipe";
import InfoModal from "../comps/modals/InfoModal";
import MainTable from "../comps/MainTable";
import PdfReader from "../comps/modals/PdfReader";
import axios from "axios";
import type { Spreadsheet } from "../types";

const MainPage = () => {
  //@ts-ignore
  const apiUrl = window.__API_CONFIG__.apiUrl;
  useEffect(()=>{
    axios
    .get(apiUrl + `api/spreadsheet`)
    .then((response) => {
      setNature(response.data[0]);
      setSocium(response.data[1]);
      setIsLoading(false);
    })
    .catch(() => {
      console.error("Ошибка получения информации");
    });
  },[]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTable, setCurrentTable] = useState(0);
  const [infoModalId, setInfoModalId] = useState<{id: number | null, type: string | null}>({id: null, type: null});
  //@ts-ignore
  const [nature, setNature]: Spreadsheet = useState(null);
  //@ts-ignore
  const [socium, setSocium]: Spreadsheet = useState(null);
  return (
    <div className="w-full h-full p-[32px]">
      {infoModalId.id !== null && infoModalId.type === "info" && (
        <InfoModal id={infoModalId.id} onClose={() => setInfoModalId({id: null, type: null})} />
      )}
      {infoModalId.id !== null && infoModalId.type === "pdf" && (
        <PdfReader title={"Id: " + infoModalId.id} onClose={() => setInfoModalId({id: null, type: null})} />
      )}
      {isLoading && 
        <div className="fixed mx-auto left-0 right-0 my-auto top-0 bottom-0 size-[100px] rounded-full border-[17px] border-dotted border-accent animate-spin"/>
      }
      <div hidden={isLoading} className="w-[1856px] h-[896px] overflow-scroll hide-scroll">
        {currentTable === 0 && (
          <MainTable
            content={nature}
            onCellInfoOpen={(id) => setInfoModalId({id: id, type: "info"})}
          />
        )}
        {currentTable === 1 && (
          <MainTable
            content={socium}
            onCellInfoOpen={(id) => setInfoModalId({id: id, type: "pdf"})}
          />
        )}
      </div>
      <MenuSwipe onSelect={(option) => setCurrentTable(option)} />
    </div>
  );
};

export default MainPage;
