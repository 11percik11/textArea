import { useState } from "react";
import MenuSwipe from "../comps/MenuSwipe";
import InfoModal from "../comps/InfoModal";
import MainTable from "../comps/MainTable";

const MainPage = () => {
    const [currentTable, setCurrentTable] = useState(0);
    const [isInfoModalOpen, setInfoModalOpen] = useState(false);
    return(
        <div className="w-full h-full p-[32px]">
            {
                isInfoModalOpen &&
                <InfoModal onClose={() => setInfoModalOpen(false)}/>
            }
            <div className="w-[1856px] h-[896px] overflow-scroll hide-scroll">
                {currentTable === 0 && //тут будет либо меняться инфа в таблице, либо сама таблица
                    <MainTable/>
                }
                {currentTable === 1 && //тут будет либо меняться инфа в таблице, либо сама таблица
                    <div className="w-full h-full bg-table-ocean">

                    </div>
                }
            </div>
            <MenuSwipe onSelect={(option)=>setCurrentTable(option)}/>
        </div>
    );
};

export default MainPage;