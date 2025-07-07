import { useState, type ChangeEvent } from "react";
import backspaceIcon from "../../assets/icons/backspaceIcon.svg"
import arrIcon from "../../assets/icons/arrIcon.svg"
import { useNavigate } from "react-router-dom";

type Props = {
    onBack: () => void;
}

const PasswordModal = ({onBack}: Props) => {
    const navigate = useNavigate();
   const testPass = "1204";
   const numbers = [1,2,3,4,5,6,7,8,9];
   const [enteredPassword, setEnteredPassword] = useState("");
   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
  };
   return(
    <div className="animate-appear w-full h-full bg-[#00000099] backdrop-blur-[40px] fixed z-100">
            <div className="mt-[192px] text-center text-white text-[32px] font-bold leading-[120%]">
            Введите пароль
        </div>
        <input onChange={handleChange} type="password" disabled={true} className="text-center w-full text-white text-[62px]" value={enteredPassword}/>
        <div className="mx-auto mt-[64px] w-[452px] h-[384px] grid grid-rows-4 grid-cols-3 gap-[16px]">
            {numbers.map((num, index: number) => (
                <div key={index} onClick={() => {setEnteredPassword((prev) => prev + num.toString());}} className="flex items-center justify-center leading-[100%] font-semibold text-white text-[32px] text-center w-[140px] h-[84px] rounded-[24px] bg-[#FFFFFF33]">
                    {num}
                </div>
            ))}
            <div className="flex gap-[16px] w-[452px]">
                <div onClick={() => {setEnteredPassword((prev) => prev.slice(0, -1))}} className="flex items-center justify-center leading-[100%] font-semibold text-white text-[32px] text-center w-[140px] h-[84px] rounded-[24px] bg-white">
                    <img src={backspaceIcon} alt="backspace" className="size-[32px]" />
                </div>
                <div onClick={() => {setEnteredPassword((prev) => prev + "0");}} className="flex items-center justify-center leading-[100%] font-semibold text-white text-[32px] text-center w-[140px] h-[84px] rounded-[24px] bg-[#FFFFFF33]">
                    {0}
                </div>
                <div onClick={() => {
                    if(testPass === enteredPassword) {
                        navigate("/admin");
                        
                    }
                    else {
                        setEnteredPassword("");
                    }
                }} className="flex items-center justify-center leading-[100%] font-semibold text-white text-[32px] text-center w-[140px] h-[84px] rounded-[24px] bg-white">
                    <img src={arrIcon} alt="next" className="size-[32px]" />
                </div>
            </div>
        </div>
        <button onClick={onBack} className="mx-auto mt-[32px] w-[452px] h-[72px] bg-white rounded-[24px] flex items-center justify-center text-[24px] text-accent font-semibold leading-[100%]">
            Назад
        </button>
    </div>
   ); 
};

export default PasswordModal;