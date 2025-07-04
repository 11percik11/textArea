import Cell from "./Cell";

type Props = {
    content: any;
}

const MainTable = () => {
    const colors = ["bg-table-yellow", "bg-table-orange", "bg-table-ocean", "bg-table-blue"];
    const testTitles = [
        "", "Происхождение горных пород из окрестности Афимьина", "Расположение окрестности Афимьина во времена образования горных пород", "Лента времени (лет назад)"
    ]
    const test = [
        [
            {"title": "Название 1 1", "image": "https://dasart.ru/preview/image?type=kartiny&image_id=170821"},
            {"title": "Элемент 1, 2"},
            {"title": "Элемент 1, 3"},
            {"title": "Элемент 1, 4"}
        ],
        [
            {"title": "Элемент 2, 1"},
            {"title": "Элемент 2, 2"},
            {"title": "Элемент 2, 3"}
        ],
        [
            {"title": "Элемент 3, 1"},
            {"title": "Элемент 3, 2"},
            {"title": "Элемент 3, 3"},
            {"title": "Элемент 3, 4"}
        ],
        [
            {"title": "Элемент 4, 1"},
            {"title": "Элемент 4, 2"},
            {"title": "Элемент 4, 3"},
            {"title": "Элемент 4, 4"}
        ]
    ]
    return(
        <div className="w-[1856px] border-[2px] border-stroke rounded-[24px] overflow-hidden">
            {test.map((row, index: number) => (
                <div 
                    key={index}
                    className={`border-b-[2px] border-stroke flex ${colors[index%4]}`}>
                        <div className={`bg-[#0000001A] min-w-[232px] max-w-[232px] px-[24px] py-[40px] text-[20px] text-text font-bold leading-[100%] text-center`}>
                            {testTitles[index]}
                        </div>
                        {row.map((cell, cellIndex: number) => (
                            <div key={cellIndex} className="border-r-[2px] border-stroke p-[24px] w-[406px] flex justify-center items-center">
                                {!!cell && <Cell data={cell}/>}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default MainTable;