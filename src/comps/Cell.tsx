type Props = {
    data: {
        type?: string;
        title?: string;
        isTitleVisible?: boolean;
        image?: string;

    }
}

const Cell = ({data}: Props) => {
    return(
        <div className="w-[358px] min-h-[74px] max-h-[212px] rounded-[24px] bg-[#FFFFFFB2] p-[12px] flex">
            {data.image && 
            <img
            src={data.image}

                className="size-[121px] rounded-[12px] "
            />
            }
            {data.title}
        </div>
    );
};

export default Cell;