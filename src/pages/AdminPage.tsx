import AdminTable from "../comps/AdminTable";
import MenuSwipe from "../comps/MenuSwipe";
import exitIcon from "../assets/icons/exitIcon.svg"
import { useState } from "react";
import ExitModal from "../comps/modals/ExitModal";
import { useNavigate } from "react-router-dom";
import arrIcon from "../assets/icons/grayArrIcon.svg"
import addIcon from "../assets/icons/addIcon.svg"

const AdminPage = () => {
    const [isExitModalOpen, setExitModalOpen] = useState(false);
    const navigate = useNavigate();
    return(
        <div className="animate-appear w-full h-full p-[32px]">
            <div className="flex justify-between items-center gap-[16px]">
                <button onClick={()=>setExitModalOpen(true)} className="size-[72px] rounded-[24px] bg-white flex justify-center items-center">
                    <img src={exitIcon} alt="exit" className="size-[32px]" />
                </button>
                <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
                    Главные таблицы
                </div>
                <button disabled={true} className="w-[296px] h-[72px] rounded-[24px] text-white text-[24px] font-semibold flex items-center justify-center bg-accent disabled:opacity-[20%]">
                    Сохранить
                </button>
            </div>
            <div className="flex w-full h-[88px] my-[16px] gap-[16px]">
                <button className="w-[218px] h-[88px] bg-white rounded-[24px] px-[24px] py-[16px] flex gap-[16px]">
                    <div className="">

                    </div>
                    <div className="size-[56px] bg-accent rounded-[16px] p-[12px]">
                        <img src={addIcon} alt="add" className="" />
                    </div>
                </button>
            </div>
            <AdminTable/>
            <MenuSwipe onSelect={()=>{}}/>
            {isExitModalOpen && <ExitModal onNo={()=>setExitModalOpen(false)} onYes={() => {setExitModalOpen(false); navigate("/")}}/>}
        </div>
    )
};

export default AdminPage;