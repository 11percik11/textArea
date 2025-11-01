// import { PathlinkStore } from "../../../../../store/PathLink";
// import { Select } from "../Select/Select";

// export const CreateSelect = () => {
//   const arrTT = PathlinkStore.link.arrLinks;
//   console.log("arrTT:", arrTT);
//   return (
//     <div  className="flex">
//         {/* {arrTT.map((item) => <div>{item[1].map((e) => e)}</div>)} */}
//         {arrTT.map((arrTT) => <div>
//           <Select name={arrTT[2]} arrMap={arrTT[1]}/>
//         </div>)}
//     </div>
//   )
// }


// import { observer } from "mobx-react-lite";
// import { PathlinkStore } from "../../../../../store/PathLink";
// import { Select } from "../Select/Select";

// export const CreateSelect = observer(() => {
//   const arrTT = PathlinkStore.link.arrLinks; // теперь изменения видны

//   return (
//     <div className="flex">
//       {arrTT.map((row, idx) => (
//         <div key={idx}>
//           <Select name={row[2]} arrMap={row[1]} />
//         </div>
//       ))}
//     </div>
//   );
// });


// CreateSelect.tsx
import { observer } from "mobx-react-lite";
import { PathlinkStore } from "../../../../../store/PathLink";
import { Select } from "../Select/Select";
import { useLocation, useNavigate } from "react-router-dom";

export const CreateSelect = observer(() => {
  const arrTT = PathlinkStore.link.arrLinks; // [number, TitleWithPos[], string][]
  const navigate = useNavigate();
  const location = useLocation();

  const handlePick = (colIndex: number, pos: [number, number]) => {
    // 1) обрезаем всё справа от выбранной колонки
    PathlinkStore.trimFrom?.(colIndex); // если добавил метод из прошлого ответа

    // 2) получаем НОВЫЙ id для URL из выбранной колонки
    const newId = arrTT[colIndex]?.[0];
    if (newId == null) return;

    // 3) собираем query-параметры
    const params = new URLSearchParams(location.search);
    params.set("id", String(newId));
    params.set("rowIndex", String(pos[0]));
    params.set("cellIndex", String(pos[1]));

    // 4) переходим на нужный путь (если нужно именно /user-inner-table)
    navigate(
      { pathname: "/user-inner-table", search: `?${params.toString()}` },
      { replace: true } // или false, если хочешь, чтобы "Назад" закрывал выбор
    );
  };

  return (
    <div className="flex">
      {arrTT.map((row, idx) => (
        <div key={idx}>
          <Select
            name={row[2]}        // заголовок колонки
            arrMap={row[1]}      // список [title, [r,c]]
            columnIndex={idx}
            onPick={handlePick}
          />
        </div>
      ))}
    </div>
  );
});

