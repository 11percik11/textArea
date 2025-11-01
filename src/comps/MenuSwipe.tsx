import { observer } from "mobx-react-lite";
import { spreadsheetManager } from "../store/root";
import { PathlinkStore } from "../store/PathLink";

const MenuSwipe = () => {
  const { mainLink } = PathlinkStore.link;

  return (
    <div className="z-1 fixed mx-auto left-0 right-0 bottom-[32px] w-[608px] h-[88px] bg-white rounded-[32px] flex p-[8px] gap-[8px]">
      <div
        className={`w-[292px] h-[72px] rounded-[24px] bg-accent absolute z-0 transition duration-300 ${mainLink === "society" && "translate-x-[300px]"}`}
      />
      <div
        onClick={() => {
          PathlinkStore.setMainLink("nature");
          spreadsheetManager.setCurrentTabId(1);
        }}
        className={`z-10 w-[292px] h-[72px] flex items-center justify-center text-[24px] font-semibold leading-[100%] ${mainLink === "nature" ? "text-white" : "text-accent"}`}
      >
        Природа
      </div>
      <div
        onClick={() => {
          PathlinkStore.setMainLink("society");
          spreadsheetManager.setCurrentTabId(2);
        }}
        className={`z-10 w-[292px] h-[72px] flex items-center justify-center text-[24px] font-semibold leading-[100%] ${mainLink === "society" ? "text-white" : "text-accent"}`}
      >
        Социум
      </div>
    </div>
  );
};

export default observer(MenuSwipe);
