import Cell from "./Cell";

type Props = {
    content: any;
    onCellInfoOpen: (id: number) => void;
}

const MainTable = ({onCellInfoOpen, content}: Props) => {
    const colors = ["bg-table-yellow", "bg-table-orange", "bg-table-ocean", "bg-table-blue"];
    const testTitles = [
        "", "Происхождение горных пород из окрестности Афимьина", "Расположение окрестности Афимьина во времена образования горных пород", "Лента времени (лет назад)"
    ]
    //@ts-ignore
    return(
        <div className="w-[1856px] border-[2px] border-stroke rounded-[24px] overflow-hidden">
            {content.map((row: any, index: number) => (
                <div 
                    key={index}
                    className={`border-b-[2px] border-stroke flex ${colors[index%4]}`}>
                        <div className={`bg-[#0000001A] min-w-[232px] max-w-[232px] px-[24px] py-[40px] text-[20px] text-text font-bold leading-[100%] text-center`}>
                            {testTitles[index]}
                        </div>
                        {row.map((cell: any, cellIndex: number) => (
                            <div key={cellIndex} className="border-r-[2px] border-stroke p-[24px] w-[406px] flex justify-center items-center">
                                {!!cell && <Cell onOpen={(id)=>onCellInfoOpen(id)} data={cell}/>}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default MainTable;