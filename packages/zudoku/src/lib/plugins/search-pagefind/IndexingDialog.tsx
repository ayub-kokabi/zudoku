import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "zudoku/ui/Button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "zudoku/ui/Dialog.js";
import { useZudoku } from "../../components/context/ZudokuContext.js";
import { t } from "../../util/i18n.js";

type IndexingState =
  | { status: "idle" }
  | { status: "indexing"; total: number; current: number; path: string }
  | { status: "complete"; indexed: number }
  | { status: "error"; message: string };

const ProgressBar = ({
  total,
  current,
  barLength = 25,
  emptyChar = "░",
  filledChar = "█",
}: {
  total: number;
  current: number;
  barLength?: number;
  emptyChar?: string;
  filledChar?: string;
}) => {
  const percent = Math.round((current / total) * 100);
  const filled = Math.round((percent / 100) * barLength);
  const empty = barLength - filled;

  return (
    <>
      {filledChar.repeat(filled)}
      {emptyChar.repeat(empty)} {percent}% ({current}/{total})
    </>
  );
};

const IndexingDialog = ({ children }: PropsWithChildren) => {
  const { options } = useZudoku();
  const lang = options.site?.lang;
  const [indexingState, setIndexingState] = useState<IndexingState>({
    status: "idle",
  });

  const startIndexing = useCallback(() => {
    setIndexingState({ status: "indexing", total: 0, current: 0, path: "" });

    const eventSource = new EventSource("/__z/pagefind-reindex");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "progress") {
        setIndexingState({
          status: "indexing",
          total: data.total,
          current: data.current,
          path: data.path,
        });
      } else if (data.type === "complete") {
        eventSource.close();
        if (data.success) {
          setIndexingState({ status: "complete", indexed: data.indexed });
        } else {
          setIndexingState({
            status: "error",
            message: data.error ?? "Indexing failed",
          });
        }
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIndexingState({
        status: "error",
        message: "Connection lost during indexing",
      });
    };

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    return startIndexing();
  }, [startIndexing]);

  const handleDone = () => {
    if (indexingState.status !== "complete") return;
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-sm! top-1/3"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="me-auto pb-4">
            {indexingState.status === "indexing" &&
              t(lang, "search.indexing.building", "Building Search Index")}
            {indexingState.status === "complete" &&
              t(lang, "search.indexing.complete", "Indexing Complete")}
            {indexingState.status === "error" &&
              t(lang, "search.indexing.failed", "Indexing Failed")}
            {indexingState.status === "idle" &&
              t(lang, "search.indexing.title", "Build Search Index")}
          </DialogTitle>
          <DialogDescription className="mx-auto">
            {indexingState.status === "indexing" && (
              <>
                {indexingState.total > 0 && (
                  <span className="font-mono text-sm mb-2 block" dir="ltr">
                    <ProgressBar {...indexingState} />
                  </span>
                )}
                {indexingState.path && (
                  <span className="block text-xs truncate font-mono" dir="ltr">
                    {indexingState.path}
                  </span>
                )}
              </>
            )}
            {indexingState.status === "complete" &&
              t(
                lang,
                "search.indexing.success",
                `Successfully indexed ${indexingState.indexed} pages.`,
              ).replace("{count}", String(indexingState.indexed))}
            {indexingState.status === "error" && (
              <span className="text-destructive">
                {indexingState.message === "Connection lost during indexing"
                  ? t(
                      lang,
                      "search.indexing.error.connection",
                      "Connection lost during indexing",
                    )
                  : indexingState.message}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end gap-2 mx-auto">
            {indexingState.status === "complete" && (
              <Button size="sm" onClick={handleDone}>
                {t(lang, "search.indexing.closeReload", "Close and reload")}
              </Button>
            )}
            {indexingState.status === "error" && (
              <>
                <Button variant="outline" onClick={handleDone}>
                  {t(lang, "playground.cancel", "Cancel")}
                </Button>
                <Button onClick={startIndexing}>
                  {t(lang, "search.indexing.retry", "Retry")}
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IndexingDialog;
