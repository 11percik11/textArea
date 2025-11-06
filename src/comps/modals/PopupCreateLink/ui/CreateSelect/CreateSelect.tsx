import { observer } from "mobx-react-lite";
import { PathlinkStore } from "../../../../../store/PathLink";
import { Select } from "../Select/Select";
import { useLocation, useNavigate } from "react-router-dom";
import { OpenPopupId } from "../../../../../store/OpenPopupId";

export const CreateSelect = observer(() => {
  const arrTT = PathlinkStore.link.arrLinks;
  console.log("arrTT", arrTT);
  
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const IdTable = params.get("id");

  const handlePick = (
    colIndex: number,
    pos: [number, number],
    type?: string,
    idTable?: any,
    idTable1?: any
  ) => {
    const newId = arrTT[colIndex]?.[0];
    if (newId == null) return;

    // params.set("id", String(newId));
    // params.set("rowIndex", String(pos[0]));
    // params.set("cellIndex", String(pos[1]));
    if (type == "table") {
      if (IdTable != idTable) {
        PathlinkStore.trimFrom?.(colIndex);
        navigate({
          pathname: "/user-inner-table",
          search: `?id=${idTable}`,
        });
      }
    } else {
      PathlinkStore.trimFrom?.(colIndex);
      OpenPopupId.setOpenIndexPopup(true, [pos[0], pos[1]]);
      navigate({ 
          pathname: "/user-inner-table",
          search: `?id=${idTable1}`,
        });
      // navigate(
      //   { pathname: "/user-inner-table", search: `?${params.toString()}` },
      //   { replace: true },
      // );
    }
  };

  return (
    <div className="flex">
      {arrTT.map((row, idx) => (
        <div key={idx}>
          <Select
            idTable1={row[0]}
            name={row[2]}
            arrMap={row[1]}
            columnIndex={idx}
            onPick={handlePick}
          />
        </div>
      ))}
    </div>
  );
});
