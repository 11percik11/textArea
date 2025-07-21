import { useState } from "react";
import MenuSwipe from "../comps/MenuSwipe";
import InfoModal from "../comps/modals/InfoModal";
import MainTable from "../comps/MainTable";
import PdfReader from "../comps/modals/PdfReader";

const MainPage = () => {
  const [currentTable, setCurrentTable] = useState(0);
  const [infoModalId, setInfoModalId] = useState<{id: number | null, type: string | null}>({id: null, type: null});
  //@ts-ignore
  const nature: Table = window.__testable__.nature;
  //@ts-ignore
  const socium: Table = window.__testable__.socium;
  return (
    <div className="w-full h-full p-[32px]">
      {infoModalId.id !== null && infoModalId.type === "info" && (
        <InfoModal id={infoModalId.id} onClose={() => setInfoModalId({id: null, type: null})} />
      )}
      {infoModalId.id !== null && infoModalId.type === "pdf" && (
        <PdfReader title={"Id: " + infoModalId.id} onClose={() => setInfoModalId({id: null, type: null})} />
      )}
      <div className="w-[1856px] h-[896px] overflow-scroll hide-scroll">
        {currentTable === 0 && (
          <MainTable
            content={nature}
            onCellInfoOpen={(id) => setInfoModalId({id: id, type: "info"})}
          />
        )}
        {currentTable === 1 && (
          <MainTable
            content={nature}
            onCellInfoOpen={(id) => setInfoModalId({id: id, type: "pdf"})}
          />
        )}
      </div>
      <MenuSwipe onSelect={(option) => setCurrentTable(option)} />
    </div>
  );
};

export default MainPage;
