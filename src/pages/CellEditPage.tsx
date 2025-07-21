import { useState } from "react";
import exitIcon from "../assets/icons/exitIcon.svg"
import ExitModal from "../comps/modals/ExitModal";
import { useNavigate, useParams } from "react-router-dom";
import arrIcon from "../assets/icons/arrSimple.svg";
import ChooseTemplate from "../comps/ChooseTemplate";
import FilesAdder from "../comps/FilesAdder";
import addIcon from "../assets/icons/addIcon.svg";


const CellEditPage = () => {
    const [isExitModalOpen, setExitModalOpen] = useState(false);
    const [isCellExist, setCellExist] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const handleBack = () => {

    };
    const [selectedTemplate, setSelectedTemplate] = useState(0); //потом поменять на cell type
   return(
    <div className="animate-appear w-full h-full p-[32px]">
        <div className="flex justify-between items-center gap-[16px]">
            <button onClick={()=>setExitModalOpen(true)} className="size-[72px] rounded-[24px] bg-white flex justify-center items-center">
                <img src={exitIcon} alt="exit" className="size-[32px]" />
            </button>
            <button onClick={handleBack} className="size-[72px] rounded-[24px] bg-white flex justify-center items-center">
                <img src={arrIcon} alt="back" className="size-[32px]" />
            </button>
            <div className="w-[1456px] h-[32px] text-accent text-[32px] font-bold">
                Редактирование ячейки
            </div>
            <button disabled={false} className="w-[296px] h-[72px] rounded-[24px] text-white text-[24px] font-semibold flex items-center justify-center bg-accent disabled:opacity-[20%]">
                Сохранить
            </button>
        </div>
        <div className="flex gap-[16px] mt-[16px]">
            <ChooseTemplate selectedTemplate={selectedTemplate} setSelectedTemplate={(type) => setSelectedTemplate(type)}/>
            <div className="w-[1232px] h-[928px] bg-black">

            </div>
            <div className="w-[296px] h-[928px]">
                <div className="w-[296px] h-[172px] bg-white rounded-[24px] p-[16px]">
                    <div className="text-center mx-auto text-accent text-[32px] font-bold">
                        Таблица
                    </div>
                    <button disabled={!isCellExist} className="disabled:opacity-[20%] mt-[16px] mx-auto w-[264px] h-[56px] rounded-[12px] bg-accent text-[20px] text-white font-semibold flex gap-[12px] items-center justify-center">
                        <img src={addIcon} alt="add" className="size-[32px]" />
                        Добавить
                    </button>
                    <div className="mt-[16px] text-center mx-auto text-[16px] text-stroke font-bold">
                        Сначала создайте ячейку
                    </div>
                </div>
                <FilesAdder/>
            </div>
        </div>
        {isExitModalOpen && <ExitModal onNo={()=>setExitModalOpen(false)} onYes={() => {setExitModalOpen(false); navigate("/")}}/>}
    </div>
   ); 
}; 

export default CellEditPage;