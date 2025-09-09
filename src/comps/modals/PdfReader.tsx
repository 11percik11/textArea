import { useEffect, useRef, useState } from "react";
import { usePdf } from "@mikecousins/react-pdf";
import closeIcon from "../../assets/icons/closeIcon.svg";

type Props = {
  src: string;
};

const PdfReader = ({ src }: Props) => {
  const [page, setPage] = useState(1);
  console.log(src);
  const [page2, setPage2] = useState(2);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);
  const { pdfDocument } = usePdf({
    file: `http://localhost:4000/proxy?url=${src}`,    //change if server is local
    // file: src,
    page,
    canvasRef,
  });
  const {} = usePdf({
    file: `http://localhost:4000/proxy?url=${src}`,       //change if server is local
    page: page2,
    canvasRef: canvasRef2,
  });

  useEffect(()=>{
    setPage(1);
    setPage2(2);
  }, [src])
  return (
    <>
        <div className="w-[1168px] h-[752px] flex gap-[32px] mt-[-16px] justify-center items-center">
          {!pdfDocument && <span className={"text-black"}>Loading...</span>}
          <canvas
            className="w-[531px] h-[752px] rounded-[12px]"
            ref={canvasRef}
          />
          {pdfDocument && pdfDocument.numPages >= page2 && (
            <canvas
              className="w-[531px] h-[752px] rounded-[12px]"
              ref={canvasRef2}
            />
          )}
        </div>
      <div className="z-100 p-[8px] w-[608px] h-[96px] rounded-[32px] bg-white fixed bottom-[32px] left-0 right-0 mx-auto flex gap-[8px]">
        <button
          className="disabled:opacity-[20%] size-[80px] bg-accent p-[24px] rounded-[24px]"
          disabled={page === 1}
          onClick={() => {
            setPage(page - 2);
            setPage2(page2 - 2);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.6508 5.90775C21.0701 6.26718 21.1187 6.89848 20.7593 7.3178L13.3171 16.0003L20.7593 24.6829C21.1187 25.1022 21.0701 25.7335 20.6508 26.0929C20.2315 26.4524 19.6002 26.4038 19.2407 25.9845L11.2407 16.6511C10.9198 16.2766 10.9198 15.724 11.2407 15.3496L19.2407 6.01622C19.6002 5.59689 20.2315 5.54833 20.6508 5.90775Z"
              fill="white"
            />
          </svg>
        </button>
        <div className="text-[24px] text-accent font-semibold w-[416px] h-[80px] rounded-[24px] bg-[#B8B8B84D] flex items-center justify-center text-center">
          {page}
          {pdfDocument?.numPages &&
            page2 <= pdfDocument?.numPages &&
            "-" + page2}{" "}
          из {pdfDocument?.numPages}
        </div>
        <button
          className="disabled:opacity-[20%] size-[80px] bg-accent p-[24px] rounded-[24px]"
          disabled={!!pdfDocument?.numPages && page2 >= pdfDocument?.numPages}
          onClick={() => {
            setPage(page + 2);
            setPage2(page2 + 2);
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="rotate-180"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.6508 5.90775C21.0701 6.26718 21.1187 6.89848 20.7593 7.3178L13.3171 16.0003L20.7593 24.6829C21.1187 25.1022 21.0701 25.7335 20.6508 26.0929C20.2315 26.4524 19.6002 26.4038 19.2407 25.9845L11.2407 16.6511C10.9198 16.2766 10.9198 15.724 11.2407 15.3496L19.2407 6.01622C19.6002 5.59689 20.2315 5.54833 20.6508 5.90775Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default PdfReader;
