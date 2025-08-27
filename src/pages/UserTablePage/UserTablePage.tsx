import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";

import { useGetSpreadsheetByUrl } from "../TablePage/useGetSpreadsheetByUrl";
import UserTable from "../../comps/UserTable/UserTable";
import InfoModal from "../../comps/modals/InfoModal/InfoModal";
import type { SpreadsheetCellEntity } from "../../store/SpreadsheetCellEntity";
import { spreadsheetManager } from "../../store/root";
import { Header } from "../shared/Header";
import OverlayLoader from "../../comps/OverlayLoader/OverlayLoader";

const UserTablePage = () => {
  const { data, searchParamsSpreadsheetId } = useGetSpreadsheetByUrl();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInfoModalCell(null);
    setIsLoading(true);
    spreadsheetManager
      .getOneSpreadSheetHandler(searchParamsSpreadsheetId)
      .finally(() => setIsLoading(false));
  }, [searchParamsSpreadsheetId]);

  const [infoModalCell, setInfoModalCell] =
    useState<SpreadsheetCellEntity | null>(null);

  const pageTitle = data ? data.title : "";

  return (
    <div className="w-full h-full p-[32px]" key={searchParamsSpreadsheetId}>
      <Header title={pageTitle} />
      <OverlayLoader isLoading={isLoading} />
      {infoModalCell !== null && (
        <InfoModal
          cell={infoModalCell}
          onClose={() => setInfoModalCell(null)}
        />
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
