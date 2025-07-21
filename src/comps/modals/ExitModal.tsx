type Props = {
  onNo: () => void;
  onYes: () => void;
};

const ExitModal = ({ onNo, onYes }: Props) => {
  return (
    <div className="animate-appear w-full h-full fixed bg-[#00000099] top-0 left-0 flex items-center justify-center">
      <div className="w-[764px] h-[206px] bg-white rounded-[32px] p-[32px]">
        <div className="text-[32px] text-accent font-bold leading-[120%] text-center">
          Выйти из режима администратора?
        </div>
        <div className="flex mt-[32px] gap-[16px]">
          <button
            onClick={onNo}
            className="w-[342px] h-[72px] rounded-[24px] border-[2px] border-accent bg-white text-accent text-[24px] font-semibold"
          >
            Нет
          </button>
          <button
            onClick={onYes}
            className="w-[342px] h-[72px] rounded-[24px] bg-accent text-white text-[24px] font-semibold"
          >
            Да
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
