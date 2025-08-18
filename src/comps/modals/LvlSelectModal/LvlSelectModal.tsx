import clsx from "clsx";
import style from "./LvlSelectModal.module.scss";
import { Icons } from "../../icons";

export const LvlSelectModal = () => {
  const lvls = [
    { id: 1, title: "Известняк (Д. Рогачёво)" },
    { id: 2, title: "Новая ячейка" },
  ];

  const currentId = 1;

  return (
    <div
      className={clsx(
        style.LvlSelectModal,
        "animate-appear w-full h-full bg-[#00000099] backdrop-blur-[40px] fixed z-100",
      )}
    >
      <div className={style.LvlSelectModalInner}>
        <header>
          <span>Вложенность</span>
          <button className={style.LvlSelectModal__closeButton}>
            <span className={style.LvlSelectListItem__before}>
              <Icons.CloseIcon color="#fff" />
            </span>
          </button>
        </header>
        <ul className={style.LvlSelectList}>
          <li className={style.LvlSelectListItem}>
            <span className={style.LvlSelectListItem__before}>
              <Icons.StarIcon />
            </span>
            <p className={style.LvlSelectListItem__text}>Природа</p>
          </li>
          {lvls.map((lvl, index) => (
            <li
              className={clsx(
                style.LvlSelectListItem,
                currentId === lvl.id && style.LvlSelectListItem_active,
              )}
              key={lvl.id}
            >
              <span className={style.LvlSelectListItem__before}>
                {index + 1}
              </span>
              <p className={style.LvlSelectListItem__text}>{lvl.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
