import refreshIcon from "../assets/icons/Refresh.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import addIcon from "../assets/icons/addIcon.svg";

const FilesAdder = () => {
  return (
    <div className="w-[296px] h-[740px] bg-white rounded-[24px] mt-[16px] p-[16px]">
      <div className="text-[32px] text-accent font-bold text-center">Файлы</div>
      <div className="w-[264px] h-[556px] overflow-y-auto overflow-x-hidden">
        {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(
          () => (
            <div className="mt-[16px] max-w-[264px] h-[106px] rounded-[14px] bg-[#0046621A] p-[16px]">
              <div className="flex w-full justify-between font-normal text-text text-[16px] mb-[8px]">
                {"Название"}
                <div className="text-[12px] font-bold w-[49px] h-[32px] rounded-[17px] bg-[#FFFFFF80] flex text-center justify-center items-center">
                  {".pdf"}
                </div>
              </div>
              <div className="flex w-full justify-between font-normal text-text text-[16px] mb-[8px]">
                <button className="size-[34px] rounded-[6px] bg-white flex items-center justify-center">
                  <img
                    src={refreshIcon}
                    alt="refresh"
                    className="size-[24px]"
                  />
                </button>
                <button className="size-[34px] rounded-[6px] bg-white flex items-center justify-center">
                  <img src={deleteIcon} alt="refresh" className="size-[24px]" />
                </button>
              </div>
            </div>
          ),
        )}
      </div>
      <div className="mt-[16px] w-[264px] h-[16px] text-[16px] text-[#C9C9C9] font-bold text-center flex gap-[12px] items-center justify-center">
        <div>.doc</div>
        <div>.docx</div>
        <div>.xlsx</div>
        <div>.xls</div>
        <div>.pdf</div>
      </div>
      <button className="mt-[16px] w-[264px] h-[56px] bg-accent rounded-[12px] flex items-center justify-center gap-[12px] text-white text-[20px] font-semibold">
        <img src={addIcon} alt="add" className="size-[32px]" />
        Добавить
      </button>
    </div>
  );
};

export default FilesAdder;
