import { useEffect, useRef, useState } from "react";
import styles from "./PdfClass.module.scss";
import * as pdfjsLib from "pdfjs-dist";
import KeyBoardLetters from "../KeyBoardLetters/KeyBoardLetters";
import VectorLeft from "../../../assets/icons/back_arrow.svg";
import VectorRight from "../../../assets/icons/prev_arrow.svg";
// import KeyBoardLetters from "../../../../shared/ui/KeyBoardLetters/KeyBoardLetters";
// import Loader from "../../../../shared/ui/Loader/Loader";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

export default function PdfViewer({ url }: PdfViewerProps) {
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [showKeyBoard, setShowKeyBoard] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!url) return;

  let cancelled = false;
  let loadingTask: any = null;
  let pdfInstance: any = null;
  const blobUrlRef = { current: null as string | null };

  const loadPdf = async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentPage(1);

      // 🚫 отключаем кэш браузера
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error("Ошибка загрузки PDF");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      blobUrlRef.current = blobUrl;

      // 📄 создаём задачу загрузки PDF
      loadingTask = pdfjsLib.getDocument(blobUrl);
      const pdf = await loadingTask.promise;
      if (cancelled) {
        pdf.destroy?.();
        return;
      }

      pdfInstance = pdf;
      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
    } catch (err) {
      if (!cancelled) {
        console.error("Ошибка загрузки PDF:", err);
        setError("Не удалось загрузить PDF.");
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadPdf();

  // 🧹 очистка при смене url или размонтировании
  return () => {
    cancelled = true;

    try {
      if (loadingTask) loadingTask.destroy?.();
      if (pdfInstance) pdfInstance.destroy?.();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    } catch (e) {
      console.warn("Ошибка при очистке ресурсов PDF:", e);
    }
  };
}, [url]);

  useEffect(() => {
    if (!pdfDoc) return;

    let renderTask1: any = null;
    let renderTask2: any = null;
    let cancelled = false;

    const render = async (
      pageNum: number,
      canvasRef: React.RefObject<HTMLCanvasElement | null>,
    ) => {
      if (!canvasRef.current || pageNum > numPages) return;
      const page = await pdfDoc.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const container = canvas.parentElement;
      const containerWidth = container ? container.clientWidth : 800;

      const viewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      if (cancelled) return;

      const renderTask = page.render({
        canvasContext: context!,
        viewport: scaledViewport,
      });
      if (canvasRef === canvasRef1) renderTask1 = renderTask;
      if (canvasRef === canvasRef2) renderTask2 = renderTask;

      await renderTask.promise.catch((err: unknown) => {
        if ((err as any)?.name !== "RenderingCancelledException") {
          console.error("Render error:", err);
        }
      });
    };

    const renderPages = async () => {
      // Отменяем предыдущие рендеры, если они были
      if (renderTask1) renderTask1.cancel();
      if (renderTask2) renderTask2.cancel();

      await render(currentPage, canvasRef1);

      if (currentPage + 1 <= numPages) {
        await render(currentPage + 1, canvasRef2);
        canvasRef2.current!.style.display = "block";
      } else {
        if (canvasRef2.current) canvasRef2.current.style.display = "none";
      }
    };

    renderPages();

    // Очистка при смене страницы
    return () => {
      cancelled = true;
      if (renderTask1) renderTask1.cancel();
      if (renderTask2) renderTask2.cancel();
    };
  }, [pdfDoc, currentPage, numPages]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 2, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 2, numPages));

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  if (loading) {
    return <div className={styles.loaderWrapper}>{/* <Loader /> */}</div>;
  }

  return (
    <div className={styles.pdfViewer}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.viewer} ${numPages >= 3 ? styles.multiPage : ""}`}
      >
        <canvas
          ref={canvasRef1}
          className={`${styles.canvas} ${
            numPages >= 3 ? styles.canvasMore : ""
          }`}
        />
        <canvas
          ref={canvasRef2}
          className={`${styles.canvas} ${
            numPages >= 3 ? styles.canvasMore : ""
          }`}
        />
      </div>

      {numPages > 2 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.pdfViewer__pagination}
        >
          {!showKeyBoard && (
            <>
              <button
                className={`${styles.pdfViewer__buttonPagination} ${currentPage < 2 && styles.pdfViewer__buttonPaginationNone}`}
                onClick={handlePrev}
                disabled={currentPage <= 1}
              >
                <img src={VectorLeft} alt="" />
              </button>
              <div
                onClick={() => setShowKeyBoard(true)}
                className={styles.pdfViewer__Boxpage}
              >
                <span className={styles.pdfViewer__page}>
                  Страницы {currentPage}
                  {currentPage + 1 <= numPages
                    ? ` – ${currentPage + 1}`
                    : ""} / {numPages}
                </span>
              </div>
              <button
                className={`${styles.pdfViewer__buttonPagination} ${currentPage >= numPages - 1 && styles.pdfViewer__buttonPaginationNone}`}
                onClick={handleNext}
                disabled={currentPage + 1 > numPages}
              >
                <img src={VectorRight} alt="" />
              </button>
            </>
          )}
        </div>
      )}

      {showKeyBoard && (
        <div onClick={(e) => e.stopPropagation()}>
          <KeyBoardLetters
            onVisable={() => setShowKeyBoard(false)}
            keyBoardNumber
            currentPage={currentPage}
            maxValue={numPages}
            onInputChange={(val) => {
              const page = Number(val);
              if (!isNaN(page) && page >= 1 && page <= numPages) {
                const evenCorrected = page % 2 === 0 ? page - 1 : page;
                setCurrentPage(evenCorrected);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
