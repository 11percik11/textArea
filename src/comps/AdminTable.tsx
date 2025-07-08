import dragIcon from "../assets/icons/dragIcon.svg"
import deleteIcon from "../assets/icons/deleteIcon.svg"

type Props = {
    content: any;
}

const AdminTable = ({content}: Props) => {
    const handleHorizontalDrag = (index: number) => {
        console.log(index);
    };
    return(
        <div className="w-[1856px] h-[720px] bg-white rounded-[24px] border-[1px] border-stroke overflow-x-auto overflow-y-hidden">
            <div className="w-full h-[40px] pl-[40px] flex">
                <div className="w-[232px] h-[40px] bg-[#0000000D] border-[1px] border-stroke"/>
                {content[0].map((row: any, index:number)=>(
                    <div 
                        key={index} className="bg-[#F6F6F6] px-[8px] w-[424px] h-[40px] border-[1px] border-stroke flex justify-between items-center">
                        <img onTouchStart = {() => handleHorizontalDrag(index)} src={dragIcon} alt="" className="size-[24px]" />
                        <img src={deleteIcon} alt="" className="size-[24px]" />
                    </div>
                ))}
            </div>
            <div className="w-full h-full bg-black">
                <div>
                    
                </div>
            </div>
        </div>
    )
};

export default AdminTable;