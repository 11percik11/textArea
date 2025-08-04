import AdminTable from "../comps/AdminTable";
import MenuSwipe from "../comps/MenuSwipe";
import exitIcon from "../assets/icons/exitIcon.svg";
import { useEffect, useRef, useState } from "react";
import ExitModal from "../comps/modals/ExitModal";
import { useNavigate } from "react-router-dom";
import arrIcon from "../assets/icons/grayArrIcon.svg";
import addIcon from "../assets/icons/addIcon.svg";
import type { Cell, Spreadsheet } from "../types";
import axios from "axios";

type Props = {
  onSelectCell: (data: Cell) => void;
};

const AdminPage = ({ onSelectCell }: Props) => {
  const [isExitModalOpen, setExitModalOpen] = useState(false);

  //@ts-ignore
  const apiUrl = window.__API_CONFIG__.apiUrl;
  const [isLoading, setIsLoading] = useState(true);
  const onAddRow = (table: Spreadsheet | null) => {
    if (table === null) return;
    const cells = Array.from(
      { length: table.rows[0].cells.length },
      (_, index) => ({
        id: null,
        sequence: index + 1,
      }),
    );

    axios
      .post(
        apiUrl + "api/rows",
        {
          rows: [
            {
              id: null,
              title: "",
              sequence: table.rows.length + 1,
              cells: cells,
            },
          ],
        },
        {
          headers: {
            'accept': "application/json",
            "Content-Type": 'application/json',
          },
          params: {
            spreadsheetId: table.id,
          },
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log(response);
        getTable();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTable = () => {
    axios
      .get(apiUrl + `api/spreadsheet`)
      .then((response) => {
        setTable(response.data[0]);
        setCurrTable(response.data[0].rows);
        setIsLoading(false);
      })
      .catch(() => {
        console.error("Ошибка получения информации");
      });
  };
  useEffect(() => {
    getTable();
  }, []);
  const [table, setTable] = useState<Spreadsheet | null>(null);
  const [currTable, setCurrTable] = useState<Spreadsheet["rows"]>([]);
  const navigate = useNavigate();
  return (
    <div className="animate-appear w-full h-full p-[32px]">
      <div className="flex justify-between items-center gap-[16px]">
        <button
          onClick={() => setExitModalOpen(true)}
          className="size-[72px] rounded-[24px] bg-white flex justify-center items-center"
        >
          <img src={exitIcon} alt="exit" className="size-[32px]" />
        </button>
        <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
          Главные таблицы
        </div>
        <button
          disabled={JSON.stringify(currTable) == JSON.stringify(table?.rows)}
          className="w-[296px] h-[72px] rounded-[24px] text-white text-[24px] font-semibold flex items-center justify-center bg-accent disabled:opacity-[20%]"
        >
          Сохранить
        </button>
      </div>
      <div className="flex w-full h-[88px] my-[16px] gap-[16px]">
        <button className="w-[218px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex gap-[16px]">
          <div className="w-[98px] h-[56px] text-[16px] text-accent font-bold text-left">
            Колонки
            <div className="mt-[8px] gap-[8px] w-[59px] h-[32px] text-[32px] text-[#C9C9C9] font-bold flex justify-left items-center">
              {currTable[0]?.cells.length}
              <img src={arrIcon} alt="cols" className="size-[32px]" />
            </div>
          </div>
          <div className="size-[56px] bg-accent rounded-[16px] p-[12px]">
            <img src={addIcon} alt="add" className="" />
          </div>
        </button>
        <button
          onClick={() => {
            onAddRow(table);
          }}
          className="w-[218px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex gap-[16px]"
        >
          <div className="w-[98px] h-[56px] text-[16px] text-accent font-bold text-left">
            Строки
            <div className="mt-[8px] gap-[8px] w-[59px] h-[32px] text-[32px] text-[#C9C9C9] font-bold flex justify-left items-center">
              {currTable.length}
              <img
                src={arrIcon}
                alt="rows"
                className="size-[32px] rotate-270"
              />
            </div>
          </div>
          <div className="size-[56px] bg-accent rounded-[16px] p-[12px]">
            <img src={addIcon} alt="add" className="" />
          </div>
        </button>
      </div>
      <AdminTable
        onSelectCell={(data) => onSelectCell(data)}
        onEdit={(editedTable) => {
          setCurrTable(editedTable);
        }}
        content={currTable}
      />
      <MenuSwipe onSelect={() => {}} />
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

export default AdminPage;
