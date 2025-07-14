import type { Cell } from "../types";
import imageIcon from "../assets/icons/imageIcon.svg";
import textIcon from "../assets/icons/textIcon.svg";
import tableIcon from "../assets/icons/tableIcon.svg";
import videoIcon from "../assets/icons/videoIcon.svg";
import documentIcon from "../assets/icons/Document Text.svg"
import imagesIcon from "../assets/icons/AlbumIcon.svg"

type Props = {
    data: Cell;
    color: string;
}

const AdminCell = ({data, color}: Props) => {
    return(
        <div style={{'backgroundColor':color}} className={`border-[1px] border-stroke  min-w-[424px] h-[152px] p-[24px] relative`}>
            <div hidden={!data.id} className="w-[376px] h-[56px] flex gap-[8px] justify-left items-center">
                {data.media && data.media.length <= 5 && data.media?.map((media, index:number)=>(
                    <div key={index} className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
                        <img hidden={media.type!=="image"} src={imageIcon} alt="image" className="size-[24px]" />
                        <img hidden={media.type!=="video"} src={videoIcon} alt="video" className="size-[24px]" />
                    </div>
                ))}
                {data.media && data.media.length > 5 && 
                    <div className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
                        <img src={imagesIcon} alt="image" className="size-[24px]" />
                    </div>
                }
                {data.files?.map((file, index:number)=>(
                    <div key={index} className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
                        <img src={documentIcon} alt="document" className="size-[24px]" />
                    </div>
                ))}
                {!!data.tableId && (
                    <div className="size-[44px] bg-[#0046621A] rounded-full flex justify-center items-center">
                        <img src={tableIcon} alt="table" className="size-[24px]" />
                    </div>
                )}
            </div>
            <div hidden={!data.id} className="absolute bottom-[24px] text-[24px] text-accent font-semibold">
                {data.title || <span className="text-text opacity-[60%]">Без названия</span>}
            </div>
        </div>
    );
};

export default AdminCell;