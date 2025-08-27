import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";

import { useGetSpreadsheetByUrl } from "../TablePage/useGetSpreadsheetByUrl";
import UserTable from "../../comps/UserTable/UserTable";
import InfoModal from "../../comps/modals/InfoModal/InfoModal";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
import { spreadsheetManager } from "../../store/root";
import { Header } from "../shared/Header";

const UserTablePage = () => {
  const { data, searchParamsSpreadsheetId } = useGetSpreadsheetByUrl();

  useEffect(() => {
    spreadsheetManager.getOneSpreadSheetHandler(searchParamsSpreadsheetId);
  }, [data]);

  const [infoModalCell, setInfoModalCell] = useState<SpreadsheetCellEntity | null>(null);
  const isLoading = false;

  const pageTitle = data ? data.title : "";

  return (
    <div className="w-full h-full p-[32px]">
      <Header title={pageTitle} />
      {infoModalCell !== null && (
        <InfoModal
          cell={infoModalCell}
          onClose={() => setInfoModalCell(null)}
        />
      )}
      {isLoading && (
        <div className="fixed mx-auto left-0 right-0 my-auto top-0 bottom-0 size-[100px] rounded-full border-[17px] border-dotted border-accent animate-spin" />
      )}
      <div
        hidden={isLoading}
        className="w-[1856px] h-[896px] overflow-scroll hide-scroll"
      >
        {data && (
          <UserTable
            content={data}
            onCellInfoOpen={(cell) => setInfoModalCell(cell)}
          />
        )}
      </div>
    </div>
  );
};

export default observer(UserTablePage);
